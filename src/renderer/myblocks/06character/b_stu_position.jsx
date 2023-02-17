import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import { students_datamap } from '../../datamap';

// 定义JSON格式自定义模块

// 带有映射的学生名
const jsondesc = {
    "type": "b_stu_position",
    "message0": "学生昵称 %1 设置坐标 横轴 %2 纵轴 %3 %4",
    "args0": [
      {
        "type": "input_value",
        "name": "val1",
        "check": "String"
      },
      {
        "type": "field_number",
        "name": "num1",
        "min": -1000,
        "value": 0,
        "max": 1000,
        "precision": 0.1,
      },
      {
        "type": "field_number",
        "name": "num2",
        "min": -1000,
        "value": 0,
        "max": 1000,
        "precision": 0.1,
      },
      {
        "type": "field_dropdown",
        "name": "drop1",
        "options": [
            ["保持隐藏","hideD"],
            ["逐渐出现","show"],
            ["直接出现","showD"],
        ]
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120,
    "tooltip": "",
    "helpUrl": ""
  }

// 注入自定义模块
Blockly.Blocks['b_stu_position'] = {
    init: function () {
        this.jsonInit(jsondesc);
    }
}

// 为自定义块添加js语言生成器
javascriptGenerator['b_stu_position'] = function (block) {
    const value_val1 = javascriptGenerator.valueToCode(block, 'val1', javascriptGenerator.ORDER_ATOMIC);
    if(value_val1.length==0){
      // 如果该字符串参数空内没有任何变量，忽略掉本代码块
      return ``
    }
    const number_num1 = block.getFieldValue('num1');
    const number_num2 = block.getFieldValue('num2');
    const dropdown_drop1 = block.getFieldValue('drop1');


    return `
stagelist.push(\`\${${value_val1}} x ${number_num1}\`);
stagelist.push(\`\${${value_val1}} y ${number_num2}\`);
stagelist.push(\`\${${value_val1}} ${dropdown_drop1}\`);
`

    
}

