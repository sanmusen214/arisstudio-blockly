import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import myLoader from 'renderer/models/loadcmd'
import { wrapStr } from 'renderer/utils/DataTool';
import { students_datamap } from 'renderer/datamap';
// 定义JSON格式自定义模块
let blockname="b_load_studentselect"
// 带有映射的学生名
const jsondesc = {
    "type": `${blockname}`,
    "message0": "加载人物 昵称 %1 spr名 %2 %3",
    "args0": [
      {
        "type": "input_value",
        "name": "val1",
        "check": "String"
      },
      {
        "type": "field_dropdown",
        "name": "drop1",
        "options": students_datamap
      },
      {
        "type": "field_dropdown",
        "name": "drop2",
        "options": [
            ["普通状态","spr"],
            ["通讯状态","sprc"],
        ]
      },
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "spine 角色素材需要放在 /data/character/spr 文件夹中",
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
    const sprname = block.getFieldValue('drop1');
    const state = block.getFieldValue('drop2');

    return `stagelist.push(\`${myLoader.loadspr(state,wrapStr(nickname),sprname)}\`);`
}

