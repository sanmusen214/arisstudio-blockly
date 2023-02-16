import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import { students_datamap } from '../../datamap';

// 定义JSON格式自定义模块

// 带有映射的学生名
const jsondesc = {
    "type": "b_stu_action",
    "message0": "学生昵称 %1 姿态 %2",
    "args0": [
      {
        "type": "input_value",
        "name": "val1",
        "check": "String"
      },
      {
        "type": "field_dropdown",
        "name": "drop1",
        "options": [
            ["倒地","down"],
            ["升起","up"],
            ["重置姿态","empty"],
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
Blockly.Blocks['b_stu_action'] = {
    init: function () {
        this.jsonInit(jsondesc);
    }
}

// 为自定义块添加js语言生成器
javascriptGenerator['b_stu_action'] = function (block) {
    const value_val1 = javascriptGenerator.valueToCode(block, 'val1', javascriptGenerator.ORDER_ATOMIC);
    if(value_val1.length==0){
      // 如果该字符串参数空内没有任何变量，忽略掉本代码块
      return ``
    }
    const dropdown_drop1 = block.getFieldValue('drop1');

    return `stagelist.push(\`\${${value_val1}} ${dropdown_drop1}\`);`
}

