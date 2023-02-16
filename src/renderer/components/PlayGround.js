import React, { useState } from 'react';

import  { useEffect,useRef } from 'react';
import "./PlayGround.css"
// 引入Blockly基本对象
import Blockly from 'blockly/core';
import {javascriptGenerator} from 'blockly/javascript';
import 'blockly/blocks';
// 引入字符串处理
import {generatefinalCodes} from '../utils/codetool'
import {saveToLocalStorage,saveTxt} from '../utils/IOdata';

// 设置内嵌模块语言
import locale from 'blockly/msg/zh-hans';

Blockly.setLocale(locale);

function PlayGround(props){
    const blocklyDiv = useRef();
    const toolbox = useRef();
    let primaryWorkspace = useRef();
    // 文件名
    let [filename,setFilename]=useState("blockly-test")
    // 生成的代码框，esultcode当前脚本
    let [resultcode,setResultcode]=useState("")

 
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
            // primaryWorkspace.current.addChangeListener(generateCode);
    }, [primaryWorkspace, toolbox, blocklyDiv, props]);
    // 加载项目
    const loadProject=()=>{

    }
    // 导出项目
    const saveProject=()=>{

    }
    // 实时生成代码
    const generateCode = () => {
        // 点击后生成代码
        let areacode = javascriptGenerator.workspaceToCode(
          primaryWorkspace.current
        );
        // 保存当前playground项目字符串到localstorage
        // const workspaceString=JSON.stringify(Blockly.serialization.workspaces.save(primaryWorkspace.current))
        // saveToLocalStorage("workspace",workspaceString)
        // 全局codeMap输出代码
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
    // 下载脚本
    const downloadCode=()=>{
        // saveTxt(window.resultcode)
    }

    return (
    <>
        <span id="toolsbox">
            <span id="lefttools">
                <button>导入blockly项目</button>
                <button>导出blockly项目</button>
            </span>
            <span id="righttools">
                <input value={filename} onChange={(e)=>setFilename(e.target.value)}></input>.txt
                <button onClick={downloadCode}>导出脚本</button>
                <button onClick={()=>{
                    console.log(generatefinalCodes(javascriptGenerator.workspaceToCode(
                        primaryWorkspace.current
                      )))
                      generateCode()
                }}>生成脚本</button>
            </span>
        </span>
        <span ref={blocklyDiv} id="blocklyDiv" />
        <div style={{ display: 'none' }} ref={toolbox}>
            {props.children}
        </div>
        {/* 生成的代码 显示框 */}
        <textarea spellCheck={false} id="rescodebox" value={resultcode}>
        </textarea>
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