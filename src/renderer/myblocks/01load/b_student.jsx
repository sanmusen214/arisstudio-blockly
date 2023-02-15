import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import { students_datamap } from '../../datamap';

// 定义JSON格式自定义模块

// 带有映射的学生名
const jsondesc = {
    "type": "b_student",
    "message0": "学生昵称 %1 素材文件 %2 %3",
    "args0": [
      {
        "type": "input_value",
        "name": "val1",
        "check": "String"
      },
      {
        "type": "field_dropdown",
        "name": "dro1",
        "options": students_datamap
      },
      {
        "type": "field_dropdown",
        "name": "dro2",
        "options": [
            ["普通状态","spr"],
            ["通讯状态","sprC"]
        ]
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
Blockly.Blocks['b_student'] = {
    init: function () {
        this.jsonInit(jsondesc);
    }
}

// 为自定义块添加js语言生成器
javascriptGenerator['b_student'] = function (block) {
    const value_val1 = javascriptGenerator.valueToCode(block, 'val1', javascriptGenerator.ORDER_ATOMIC);
    const dropdown_dro1 = block.getFieldValue('dro1');
    const dropdown_dro2 = block.getFieldValue('dro2');
    return `
if(importArea){
  stagelist.push(\`load ${dropdown_dro2} \${${value_val1}} ${dropdown_dro1}\`);
}
`

    
}

