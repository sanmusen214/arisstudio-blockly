import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import myScener from 'renderer/models/scenecmd';
import { wrapStr } from 'renderer/utils/DataTool';
// 定义JSON格式自定义模块
let blockname="b_screen_effect"
// 带有映射的学生名
const jsondesc = {
    "type": `${blockname}`,
    "message0": "场景效果 %1 %2",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "drop1",
            "options": [
                ["注视线","focus"],
                ["烟雾","smoke"],
                ["雨","rain"],
                ["雪","snow"],
                ["沙尘","dust"],
            ]
        },
      {
        "type": "field_dropdown",
        "name": "drop2",
        "options": [
            ["出现","show"],
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

    const type = block.getFieldValue('drop1');
    const status = block.getFieldValue('drop2');
    


    return `stagelist.push(\`${myScener.scene(type,status)}\`);`
}

