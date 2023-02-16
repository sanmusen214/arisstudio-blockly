import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

// 定义JSON格式自定义模块
let blockname="b_jump"
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


    return `stagelist.push(\`jump \${${value_val1}}\`);`
}

