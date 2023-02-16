import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

// 定义JSON格式自定义模块
let blockname="b_curtain_display"
// 带有映射的学生名
const jsondesc = {
    "type": `${blockname}`,
    "message0": "幕布 %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "drop1",
        "options": [
            ["逐渐显示","show"],
            ["逐渐隐藏","hide"],
            ["直接显示","showD"],
            ["直接隐藏","hideD"],
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


    return `stagelist.push(\`curtain ${dropdown_drop1}\`);`
}

