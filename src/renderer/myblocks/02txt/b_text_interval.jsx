import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

// 定义JSON格式自定义模块
let blockname="b_text_interval"
// 带有映射的学生名
const jsondesc = {
    "type": `${blockname}`,
    "message0": "文字打字机效果间隔 %1 秒",
    "args0": [
        {
            "type": "field_number",
            "name": "num1",
            "min": 0,
            "value": 0.02,
            "max": 1000,
            "precision": 0.01,
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
    const number_num1 = block.getFieldValue('num1');

    return `stagelist.push(\`text interval ${number_num1}\`);`
}

