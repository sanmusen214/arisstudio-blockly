import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

// 定义JSON格式自定义模块
let blockname="b_bgm_pause"
// 带有映射的学生名
const jsondesc = {
    "type": `${blockname}`,
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "drop1",
        "options": [
            ["背景音乐","bgm"],
            ["音效","se"],
        ]
      },
      {
        "type": "field_dropdown",
        "name": "drop2",
        "options": [
            ["缓出暂停","down"],
            ["立即暂停","pause"],
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
    const dropdown_drop2 = block.getFieldValue('drop2');

    if(dropdown_drop1==="down"){
      return `
stagelist.push(\`${dropdown_drop1} ${dropdown_drop2}\`);
stagelist.push(\`${dropdown_drop1} pause\`);
stagelist.push(\`${dropdown_drop1} v 0.3\`);
`
    }
    return `stagelist.push(\`${dropdown_drop1} ${dropdown_drop2}\`);`
}

