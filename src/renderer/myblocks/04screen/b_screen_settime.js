import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

// 定义JSON格式自定义模块
let blockname="b_screen_settime"
// 带有映射的学生名
const jsondesc = {
    "type": `${blockname}`,
    "message0": "场景特效 %1 显示 %2 秒",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "drop1",
        "options": [
            ["速度线","speedline"],
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

    const dropdown_drop1 = block.getFieldValue('drop1');
    const number_num1 = block.getFieldValue('num1');

    return `stagelist.push(\`screen ${dropdown_drop1} s ${number_num1}\`);`
}

