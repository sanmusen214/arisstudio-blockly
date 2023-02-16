import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

// 定义JSON格式自定义模块
let blockname="b_bgm_stop"
// 带有映射的学生名
const jsondesc = {
    "type": `${blockname}`,
    "message0": "暂停并将 %1 的时间戳设为0",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "drop1",
        "options": [
          ["背景音乐","bgm"],
          ["音效","se"],
        ]
      },
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 65,
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



    return `stagelist.push(\`${dropdown_drop1} stop\`);`
}

