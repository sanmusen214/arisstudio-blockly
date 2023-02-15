import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';


// 定义JSON格式自定义模块
const jsondesc = {
    "type": "string",
    "message0": "%1",
    "args0": [
      {
        "type": "field_input",
        "name": "strinput",
        "text": ""
      }
    ],
    "inputsInline": true,
    "output": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  }

// 注入自定义模块
Blockly.Blocks['string'] = {
    init: function () {
        this.jsonInit(jsondesc);
    }
}

// 为自定义块添加js语言生成器
javascriptGenerator['string'] = function (block) {
    // 数字
    let text_strinput = block.getFieldValue('strinput');
    return [`${text_strinput}`, javascriptGenerator.ORDER_NONE]
}