import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

// 定义JSON格式自定义模块
let blockname="b_screen_set"
// 带有映射的学生名
const jsondesc = {
    "type": `${blockname}`,
    "message0": "场景特效 %1 %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "drop1",
        "options": [
            ["速度线","speedline"],
            ["烟雾","smoke"],
            ["沙尘","dust"],
            ["下雨","rain"],
            ["下雪","snow"],
        ]
      },
      {
        "type": "field_dropdown",
        "name": "drop2",
        "options": [
            ["显示","show"],
            ["隐藏","hide"],
        ]
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
    const dropdown_drop2 = block.getFieldValue('drop2');

    return `stagelist.push(\`screen ${dropdown_drop1} ${dropdown_drop2}\`);`
}

