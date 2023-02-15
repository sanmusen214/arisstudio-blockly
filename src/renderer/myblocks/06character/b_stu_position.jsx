import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import { students_datamap } from '../../datamap';

// 定义JSON格式自定义模块

// 带有映射的学生名
const jsondesc = {
    "type": "b_stu_position",
    "message0": "学生昵称 %1 位置设定 %2 %3",
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
            ["横轴","x"],
            ["纵轴","y"]
        ]
      },
      {
        "type": "field_dropdown",
        "name": "drop2",
        "options": [
            ["最左/最下","-10"],
            ["左/下","-5"],
            ["中","0"],
            ["右/上","5"],
            ["最右/最上","10"],
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
Blockly.Blocks['b_stu_position'] = {
    init: function () {
        this.jsonInit(jsondesc);
    }
}

// 为自定义块添加js语言生成器
javascriptGenerator['b_stu_position'] = function (block) {
    const value_val1 = javascriptGenerator.valueToCode(block, 'val1', javascriptGenerator.ORDER_ATOMIC);
    const dropdown_drop1 = block.getFieldValue('drop1');
    const dropdown_drop2 = block.getFieldValue('drop2');


    return `stagelist.push(\`\${${value_val1}} ${dropdown_drop1} ${dropdown_drop2}\`);`

    
}

