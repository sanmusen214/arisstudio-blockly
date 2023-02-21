import React, { useState } from 'react';

import  { useEffect,useRef } from 'react';
import "./PlayGround.css"
// 引入Blockly基本对象
import Blockly from 'blockly/core';
import {javascriptGenerator} from 'blockly/javascript';
import 'blockly/blocks';
// 引入字符串处理
import {generatefinalCodes} from '../utils/codetool'
import {saveTxt,uploadTxt} from '../utils/IOdata';
import { gethash } from 'renderer/utils/hashtool';
import version from "../config/version"
// 设置内嵌模块语言
import locale from 'blockly/msg/zh-hans';

Blockly.setLocale(locale);

// 直接改成保存文件
// calling IPC exposed from preload script
if(window.electron&&window.electron.ipcRenderer){
    window.isinWebpageMode=false
    window.electron.ipcRenderer.on('ipc-example', (arg) => {
        // eslint-disable-next-line no-console
        // console.log(arg);
        return
    });
}else{
    // console.log("thisway")
    window.isinWebpageMode=true
}


// 防抖
function antiShake(fun, delay) {
    window.genrun = null;
    return function (e) {
        clearTimeout(window.genrun);
        window.genrun = setTimeout(() => {
            fun.apply(this, arguments);
        }, delay)
    };
}



function PlayGround(props){
    const blocklyDiv = useRef();
    const toolbox = useRef();
    let primaryWorkspace = useRef();
    
    // 实时导出的文件路径使用window.wfilepath

    // 是否显示右侧工具框
    let [showtool,setShowtool]=useState(true)
    // 生成的代码框，esultcode当前脚本
    let [resultcode,setResultcode]=useState("")
    // 是否显示脚本框
    let [showres,setShowres]=useState(true)




    // Playground设定变更时重绘
    useEffect(() => {
        const { initialXml, children, ...rest } = props;
            primaryWorkspace.current = Blockly.inject(
                blocklyDiv.current,
                {
                    toolbox: toolbox.current,
                    ...rest
                },
            );

            if (initialXml) {
                Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(initialXml), primaryWorkspace.current);
            }
            // 实时生成
            primaryWorkspace.current.addChangeListener(
                antiShake(antiSaveFile,500)
            );

    }, [primaryWorkspace, toolbox, blocklyDiv, props]);
    // 导入项目
    const loadProject=(e)=>{
        if(e.target && e.target.files){
            const file=e.target.files[0];
            // 检查文件名后缀
            const filenamesegs=file.name.split(".")
            if(filenamesegs[filenamesegs.length-1]==="bablockly"){
                uploadTxt(file,function(str){
                    let workspaceObj=JSON.parse(str)
                    try{
                        Blockly.serialization.workspaces.load(workspaceObj, primaryWorkspace.current);
                    }catch(error){
                        setResultcode("读取错误，请检查项目文件的版本以及blockly程序版本，不同版本间可能会不兼容")
                    }
                })
            }else{
                setResultcode("读取失败，项目文件名后缀应当是bablockly")
            }
        }
        
    }
    // 导出项目
    const saveProject=()=>{
        saveTxt(`ArisStudio_blockly可视化_${version}.bablockly`,JSON.stringify(Blockly.serialization.workspaces.save(primaryWorkspace.current)))
    }
    /**
     * 生成脚本代码，并放入屏幕右侧文本框
     *  */ 
    const generateCode = () => {
        // 生成代码前时间戳归0
        // 每次playground更新，设置window里numinbigfunc值为0，这样让utils/timestamp每次更新后都是从0开始计数，遇到一个if就自己加1，也不会不限加
        // 但是if块的上下变了，if生成的id还是会变，无伤大雅嗷
        window.numinbigfunc=0;
        // playground生成代码
        let areacode = javascriptGenerator.workspaceToCode(
          primaryWorkspace.current
        );
        // 组合代码
        const playcode=generatefinalCodes(areacode)
        window.playcode=playcode
        // 运行生成的代码
        // 这会给window注册一个makecodetxt函数并运行，然后最终脚本会存在window.txtcode,经过处理后window.rescode
        try {
            window.eval(playcode)
            setResultcode(window.txtcode)
        } catch (error) {
            setResultcode(`生成脚本时出错啦，你可以反馈该问题：${error.message}`)
        }
    }
    // 从已有文件保存一个文件位置
    const selectFilepath=(e)=>{
        if(e.target&&e.target.files){
            window.wfilepath=e.target.files[0].path // 为了实际保存
            setResultcode("开启实时导出到:"+window.wfilepath)
        }else{
            setResultcode("无法得到文件路径")
        }
    }

    // electron静默 每当playground更新时 下载脚本
    const antiSaveFile=()=>{
        generateCode();
        if(window.wfilepath){
            if(window.wfilepath.length>0){
                if(window.electron&&window.electron.ipcRenderer){
                    window.electron.ipcRenderer.sendMessage('ipc-example', [window.wfilepath, window.txtcode]);
                }
            }
        }

    }

    // web打开文件管理器 让用户下载脚本
    const downloadCode=()=>{
        saveTxt(`demob.txt`,resultcode)
    }

    /**
     * 正则获得文中每个nick对应的map（stuspeakMap），hash：{name:名字，content:话内容，line:哪一行},loadend：加载结束所在的行
     */
    const getChatinfo=(resscript)=>{
        // 匹配说话人姓名
        let resscriptlist=resscript.split("\n")
        const stuspeakMap=new Map()
        const errorstuspeakSet=new Set()
        let hasloadend=false
        for(let senidx in resscriptlist){
            // 每一行
            let linewords=resscriptlist[senidx].trim()
            if(linewords==="load end"){
                stuspeakMap.set("hasloadend",senidx)
            }
            // 正则
            // t tc
            const singlechar=`[\\u3000-\\u303f\\u4e00-\\u9fa5_a-zA-Z0-9.\\d\\w\\s\\u3002\\uff1f\\uff01\\uff0c\\u3001\\uff1b\\uff1a\\u201c\\u201d\\u2018\\u2019\\uff08\\uff09\\u300a\\u300b\\u3008\\u3009\\u3010\\u3011|\\u300e\\u300f\\u300c\\u300d\\ufe43\\ufe44\\u3014\\u3015\\u2026\\u2014\\uff5e\\ufe4f\\uffe5]`
            const matchtc=linewords.match(eval(`/tc? '(${singlechar}*)' '${singlechar}*' '(${singlechar}*)'/`))
            // th
            const matchth=linewords.match(eval(`/th ${singlechar}* '(${singlechar}*)' '${singlechar}*' '(${singlechar}*)'/`))
            // console.log(linewords,matchtc,matchth)
            if(matchtc||matchth){
                let matchres
                if(matchtc){
                    matchres=matchtc
                }else if(matchth){
                    matchres=matchth
                }
                let eleval=matchres[1]+matchres[2]
                let elekey='00'+gethash(eleval)
                if(stuspeakMap.has(elekey)){
                    errorstuspeakSet.add(matchres[2])
                }
                stuspeakMap.set(elekey,{'name':matchres[1],'content':matchres[2],'line':senidx})
            }
        }

        console.log(stuspeakMap,errorstuspeakSet)
        return stuspeakMap

    }

    /**
     * 导出对话文本
     */
     const getChattxt=()=>{
        const chatinfomap2=getChatinfo(resultcode)
        let outtxt=""
        for(let ele of chatinfomap2){
            if(ele[0]==="hasloadend"){
                continue
            }
            outtxt+=`${ele[1].name}\n`
            outtxt+=`${ele[0]}.wav\n`
            outtxt+=`${ele[1].content}\n`
        }
        saveTxt("对话文本.txt",outtxt)
    }

    /**
     * （手动/）生成脚本后的对脚本后续处理，
     * 添加对话块的语音音效
     */
    const getChatscript=()=>{
        const txtcodelist=resultcode.split("\n")

        const chatinfomap=getChatinfo(resultcode)
        const chatinfolist=[]
        for(let ele of chatinfomap){
            if(ele[0]==="hasloadend"){
                continue
            }
            chatinfolist.push(ele)
        }
        chatinfolist.reverse()
        // 先加后面的音效使用
        for(let ele of chatinfolist){
            const filename=`${ele[0]}.wav`
            const content=`${ele[1].content}`
            const lineind=ele[1].line
            // 反着来
            txtcodelist.splice(lineind,0,`se play`)
            txtcodelist.splice(lineind,0,`se set ${ele[0]}`)

        }
        // 然后加load end
        if(!chatinfomap.has("hasloadend")){
            txtcodelist.splice(0,0,"load end")
        }
        // 再加开头的音效导入
        for(let ele of chatinfolist){
            const filename=`${ele[0]}.wav`
            const content=`${ele[1].content}`
            txtcodelist.splice(0,0,`load se ${ele[0]} ${filename}`)
        }

        saveTxt("democ.txt",txtcodelist.join("\n"))
    }


    return (
    <>
            <span id="toolsbox">
            当前版本:{version}<button onClick={()=>{setShowtool(!showtool)}}>{showtool?"隐藏工具栏":"显示工具栏"}</button>
            <span style={showtool?{}:{display:"none"}}>
                <div>
                    <button className="loadprojectbutton"><input type="file" name="file" accept='*' className="projectfile" onChange={loadProject}></input>导入blockly项目</button>
                    <button onClick={saveProject}>导出blockly项目</button>
                </div>
                <div>
                    {window.isinWebpageMode?<></>:<><button className="loadprojectbutton" style={{width:"120px"}}><input type="file" name="file" accept='text/plain' className="projectfile" onChange={selectFilepath}></input>{window.wfilepath?"重新":"开始"}设定自动导出</button></>}
                    
                    <button onClick={downloadCode}>导出脚本</button>
                </div>
                <div>
                    <button onClick={getChattxt}>导出对话文本</button>
                    <button onClick={getChatscript}>导出含语音脚本</button>
                    
                </div>
                <div>
                    <button onClick={()=>setShowres(!showres)}>{showres?"隐藏下方脚本框":"显示脚本框"}</button>
                </div>
        </span>
        </span>
        <span ref={blocklyDiv} id="blocklyDiv" />
        <div style={{ display: 'none' }} ref={toolbox}>
            {props.children}
        </div>
        {/* 生成的代码 显示框 */}
        {showres?<textarea onChange={(e)=>setResultcode(e.target.value)} style={showtool?{}:{display:"none"}} spellCheck={false} id="rescodebox" value={resultcode}></textarea>:<></>}


    </>);
}

export default PlayGround;

// 基本类型
const Block = (p) => {
    const { children, ...props } = p;
    props.is = "blockly";
    return React.createElement("block", props, children);
};

const Category = (p) => {
    const { children, ...props } = p;
    props.is = "blockly";
    return React.createElement("category", props, children);
};

const Value = (p) => {
    const { children, ...props } = p;
    props.is = "blockly";
    return React.createElement("value", props, children);
};

const Field = (p) => {
    const { children, ...props } = p;
    props.is = "blockly";
    return React.createElement("field", props, children);
};

const Shadow = (p) => {
    const { children, ...props } = p;
    props.is = "blockly";
    return React.createElement("shadow", props, children);
};

export { Block, Category, Value, Field, Shadow }