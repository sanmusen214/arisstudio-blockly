import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import mySpecialer from 'renderer/models/specialcmd';
import { wrapStr } from 'renderer/utils/DataTool';
// 定义JSON格式自定义模块
let blockname="b_special_autotime"
// 带有映射的学生名
const jsondesc = {
    "type": `${blockname}`,
    "message0": "设置自动播放速度为 %1 秒",
    "args0": [
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
    const time = block.getFieldValue('num1');



    return `stagelist.push(\`${mySpecialer.autoplay(time)}\`);`
}

