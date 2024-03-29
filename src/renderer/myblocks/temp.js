import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import { wrapStr } from 'renderer/utils/DataTool';
// 定义JSON格式自定义模块
let blockname="b_temp"
// 带有映射的学生名
const jsondesc = {
    "type": `${blockname}`,
    "message0": "文字 变量 %1 下拉框 %2 数字 %3",
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
            ["",""],
            ["",""],
        ]
      },
      {
        "type": "field_number",
        "name": "num1",
        "min": 0,
        "value": 1,
        "max": 1000,
        "precision": 0.1,
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
Blockly.Blocks[blockname] = {
    init: function () {
        this.jsonInit(jsondesc);
    }
}

// 为自定义块添加js语言生成器
javascriptGenerator[blockname] = function (block) {
    const value_val1 = javascriptGenerator.valueToCode(block, 'val1', javascriptGenerator.ORDER_ATOMIC);
    const dropdown_drop1 = block.getFieldValue('drop1');
    const number_num1 = block.getFieldValue('num1');


    return `stagelist.push(\`变量\${${value_val1}} 下拉${dropdown_drop1} 数字${number_num1}\`);`
}

