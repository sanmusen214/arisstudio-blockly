import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import { students_datamap } from '../../datamap';

// 定义JSON格式自定义模块
const jsondesc = {
    "type": "character",
    "message0": "导入学生 %1 ",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "NAME",
            // 前一个是面向用户的名字，后面是参数实际值
            "options": students_datamap.map((each) => { return [each[0], each[1] + " " + each[2]] })
        },
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "人物",
    "helpUrl": ""
}

// 注入自定义模块
Blockly.Blocks['character'] = {
    init: function () {
        this.jsonInit(jsondesc);
    }
}

// 为自定义块添加js语言生成器
javascriptGenerator['character'] = function (block) {
    // 数字
    const dropdown_name = block.getFieldValue('NAME');
    return `
if(importArea){
    stagelist.push("load spr ${dropdown_name}");
}
`
}

//==========通信状态加载=============

const jsondesctong = {
    "type": "character_chat",
    "message0": "导入的学生名(通讯状态) %1 导入的素材名 %2",
    "args0": [
        {
            "type": "input_value",
            "name": "stuname"
        },
        {
            "type": "input_value",
            "name": "srcname"
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
}

// 注入自定义模块
Blockly.Blocks['character_chat'] = {
    init: function () {
        this.jsonInit(jsondescuser);
    }
}

// 为自定义块添加js语言生成器
javascriptGenerator['character_chat'] = function (block) {
    // 数字，为什么会带括号？？
    let value_stuname = javascriptGenerator.valueToCode(block, 'stuname', javascriptGenerator.ORDER_ATOMIC).slice(1,-1);
    let value_srcname = javascriptGenerator.valueToCode(block, 'srcname', javascriptGenerator.ORDER_ATOMIC).slice(1,-1);
    if (!value_srcname || !value_stuname) {
        // 无参数则不生成
        return ""
    }
    return `
if(importArea){
    stagelist.push("load sprC ${value_stuname}C ${value_srcname}");
}
`
}

//==========让用户自己输入素材地址=============

// 定义JSON格式自定义模块
const jsondescuser = {
    "type": "character_define",
    "message0": "导入自定义学生名 %1 导入自定义素材名 %2",
    "args0": [
        {
            "type": "input_value",
            "name": "stuname"
        },
        {
            "type": "input_value",
            "name": "srcname"
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
}

// 注入自定义模块
Blockly.Blocks['character_define'] = {
    init: function () {
        this.jsonInit(jsondescuser);
    }
}

// 为自定义块添加js语言生成器
javascriptGenerator['character_define'] = function (block) {
    // 数字，为什么会带括号？？
    let value_stuname = javascriptGenerator.valueToCode(block, 'stuname', javascriptGenerator.ORDER_ATOMIC).slice(1,-1);
    let value_srcname = javascriptGenerator.valueToCode(block, 'srcname', javascriptGenerator.ORDER_ATOMIC).slice(1,-1);
    if (!value_srcname || !value_stuname) {
        // 无参数则不生成
        return ""
    }
    return `
if(importArea){
    stagelist.push("load spr ${value_stuname} ${value_srcname}");
}
`
}