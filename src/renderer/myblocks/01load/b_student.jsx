import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import { students_datamap } from '../../datamap';
import { message } from 'antd';

// 定义JSON格式自定义模块

// 带有映射的学生名
const jsondesc = {
    "type": "b_student",
    "message0": "人物昵称 %1 人物对象 %2 %3",
    "args0": [
      {
        "type": "input_value",
        "name": "val1",
        "check": "String"
      },
      {
        "type": "field_dropdown",
        "name": "drop1",
        "options": students_datamap
      },
      {
        "type": "field_dropdown",
        "name": "drop2",
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
    "tooltip": "可能部分人物加载后是紫色，请检查素材和脚本里的文件名的大小写，必要时使用素材文件名加载",
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
    if(value_val1.includes(" ")){
      message.destroy()
      message.error("导入时的素材昵称不应含有空格")
    }
    if(value_val1.length==0){
      // 如果该字符串参数空内没有任何变量，忽略掉本代码块
      return ``
    }
    const dropdown_drop1 = block.getFieldValue('drop1');
    const dropdown_drop2 = block.getFieldValue('drop2');
    return `
if(importArea){
  stagelist.push(\`load ${dropdown_drop2} \${${value_val1}} ${dropdown_drop1}\`);
}
`

    
}

