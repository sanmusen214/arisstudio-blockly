import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import mySpecialer from 'renderer/models/specialcmd';
// 定义JSON格式自定义模块
let blockname="b_waitclick"
// 带有映射的学生名
const jsondesc = {
    "type": `${blockname}`,
    "message0": "等待点击",
    "args0": [],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 330,
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

    return `stagelist.push(\`${mySpecialer.breakpoint()}\`);`
}

