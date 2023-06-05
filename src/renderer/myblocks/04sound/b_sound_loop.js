import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import mySounder from 'renderer/models/soundcmd';
import { wrapStr } from 'renderer/utils/DataTool';
// 定义JSON格式自定义模块
let blockname="b_sound_loop"
// 带有映射的学生名
const jsondesc = {
    "type": `${blockname}`,
    "message0": "声音昵称 %1 设置为 %2",
    "args0": [
      {
        "type": "input_value",
        "name": "val1",
        "check": "String"
      },
      {
        "type": "field_dropdown",
        "name": "drop1",
        "options": [
            ["循环播放","loop"],
            ["播放一次","once"]
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
    const nickname = javascriptGenerator.valueToCode(block, 'val1', javascriptGenerator.ORDER_ATOMIC);
    const type = block.getFieldValue('drop1');


    return `stagelist.push(\`${mySounder.loop(wrapStr(nickname),type)}\`);`
}

