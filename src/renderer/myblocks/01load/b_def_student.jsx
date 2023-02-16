import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import { students_datamap } from '../../datamap';
import {getValinEnv} from '../../utils/codetool'

// 定义JSON格式自定义模块

// 带有映射的学生名
const jsondesc = {
    "type": "b_def_student",
    "message0": "学生昵称 %1 素材文件 %2 %3",
    "args0": [
      {
        "type": "input_value",
        "name": "val1",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "val2",
        "check": "String"
      },
      {
        "type": "field_dropdown",
        "name": "drop1",
        "options": [
            ["普通状态","spr"],
            ["通讯状态","sprC"]
        ]
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "人物素材不需要文件名后缀",
    "helpUrl": ""
  }

// 注入自定义模块
Blockly.Blocks['b_def_student'] = {
    init: function () {
        this.jsonInit(jsondesc);
    }
}

// 为自定义块添加js语言生成器
javascriptGenerator['b_def_student'] = function (block) {
    const value_val1 = javascriptGenerator.valueToCode(block, 'val1', javascriptGenerator.ORDER_ATOMIC);
    const value_val2 = javascriptGenerator.valueToCode(block, 'val2', javascriptGenerator.ORDER_ATOMIC);
    if(value_val1.length==0||value_val2.length==0){
      // 如果该字符串参数空内没有任何变量，忽略掉本代码块
      return ``
    }
    const dropdown_drop1 = block.getFieldValue('drop1');

    return `
if(importArea){
  stagelist.push(\`load ${dropdown_drop1} \${${value_val1}} \${${value_val2}}\`);
}
`
    

}

