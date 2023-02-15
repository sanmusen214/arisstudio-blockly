import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import { students_datamap } from '../../datamap';

// 定义JSON格式自定义模块

// 带有映射的学生名
const jsondesc = {
    "type": "b_load_other",
    "message0": "类型 %1 素材昵称 %2 素材文件 %3",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "drop1",
        "options": [
            ["背景","bg"],
            ["覆盖图片","cover"],
            ["背景音乐","bgm"],
            ["音效","se"],
        ]
      },
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
      
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  }

// 注入自定义模块
Blockly.Blocks['b_load_other'] = {
    init: function () {
        this.jsonInit(jsondesc);
    }
}

// 为自定义块添加js语言生成器
javascriptGenerator['b_load_other'] = function (block) {
    const dropdown_drop1 = block.getFieldValue('drop1');
    const value_val1 = javascriptGenerator.valueToCode(block, 'val1', javascriptGenerator.ORDER_ATOMIC);
    const value_val2 = javascriptGenerator.valueToCode(block, 'val2', javascriptGenerator.ORDER_ATOMIC);


    return `
if(importArea){
    stagelist.push(\`load ${dropdown_drop1} \${${value_val1}} \${${value_val2}}\`);
}
`

}

