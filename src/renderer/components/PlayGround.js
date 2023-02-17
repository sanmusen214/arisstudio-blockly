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
import version from "../config/version"
// 设置内嵌模块语言
import locale from 'blockly/msg/zh-hans';

Blockly.setLocale(locale);

// 直接改成保存文件
// calling IPC exposed from preload script
window.electron.ipcRenderer.on('ipc-example', (arg) => {
    // eslint-disable-next-line no-console
    // console.log(arg);
    return
});

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
                antiShake(()=>{
                    antiSaveFile()
                },500)
            );

    }, [primaryWorkspace, toolbox, blocklyDiv, props]);
    // 加载项目
    const loadProject=(e)=>{
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
    // 导出项目
    const saveProject=()=>{
        saveTxt(`ArisStudio_blockly_${version}.bablockly`,JSON.stringify(Blockly.serialization.workspaces.save(primaryWorkspace.current)))
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
        // 运行生成的代码
        // 这会给window注册一个makecodetxt函数并运行，然后最终脚本会存在window.txtcode
        try {
            window.eval(playcode)
            setResultcode(window.txtcode)
        } catch (error) {
            setResultcode(`构造生成码时出错啦，你可以反馈该问题：${error.message}`)
        }
    }
    // 从已有文件保存一个文件位置
    const selectFilepath=(e)=>{
        window.wfilepath=e.target.files[0].path // 为了实际保存
        setResultcode("开启实时导出到:"+window.wfilepath)
    }

    // electron静默 每当playground更新时 下载脚本
    const antiSaveFile=()=>{
        generateCode();
        if(window.wfilepath){
            if(window.wfilepath.length>0){
                window.electron.ipcRenderer.sendMessage('ipc-example', [window.wfilepath, window.txtcode]);
            }
        }

    }

    // web打开文件管理器 让用户下载脚本
    const downloadCode=()=>{
        generateCode()
        saveTxt(`demoASblockly.txt`,window.txtcode)
    }

    return (
    <>
        <span id="toolsbox">
            当前版本:{version}
                <div>
                    <button className="loadprojectbutton"><input type="file" name="file" accept='*' className="projectfile" onChange={loadProject}></input>导入blockly项目</button>
                    <button onClick={saveProject}>导出blockly项目</button>
                </div>
                <div>
                    <button className="loadprojectbutton" style={{width:"120px"}}><input type="file" name="file" accept='text/plain' className="projectfile" onChange={selectFilepath}></input>{window.wfilepath?"重新":"开始"}设定自动导出</button>
                    <button onClick={downloadCode}>导出脚本</button>
                </div>
                <div>
                    <button onClick={()=>setShowres(!showres)}>{showres?"隐藏下方脚本框":"显示脚本框"}</button>
                </div>
                
                
                

        </span>
        <span ref={blocklyDiv} id="blocklyDiv" />
        <div style={{ display: 'none' }} ref={toolbox}>
            {props.children}
        </div>
        {/* 生成的代码 显示框 */}
        {showres?<textarea spellCheck={false} id="rescodebox" value={resultcode}></textarea>:<></>}


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