import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

// 定义JSON格式自定义模块
let blockname="b_bgpic_shake"
// 带有映射的学生名
const jsondesc = {
    "type": `${blockname}`,
    "message0": "背景按 %1 震动 速度 %2 幅度 %3 震动 %4 次",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "drop1",
        "options": [
            ["x轴","shakeX"],
            ["y轴","shakeY"],
        ]
      },
      {
        "type": "field_number",
        "name": "num1",
        "min": 0,
        "value": 10,
        "max": 1000,
        "precision": 0.1,
      },
      {
        "type": "field_number",
        "name": "num2",
        "min": -1000,
        "value": 1,
        "max": 1000,
        "precision": 0.1,
      },
      {
        "type": "field_number",
        "name": "num3",
        "min": 0,
        "value": 1,
        "max": 10000000,
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
    const dropdown_drop1 = block.getFieldValue('drop1');
    const number_num1 = block.getFieldValue('num1');
    const number_num2 = block.getFieldValue('num2');
    const number_num3 = block.getFieldValue('num3');

    return `stagelist.push(\`bg ${dropdown_drop1} ${number_num1} ${number_num2} ${number_num3}\`);`
}

