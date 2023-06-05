import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import myImager from 'renderer/models/imgcmd';
import { wrapStr } from 'renderer/utils/DataTool';

// 定义JSON格式自定义模块
let blockname="b_pic_display"
// 带有映射的学生名
const jsondesc = {
    "type": `${blockname}`,
    "message0": "图片昵称 %1 %2",
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
            ["渐入","show"],
            ["渐出","hide"],
            ["显示","appear"],
            ["隐藏","disappear"],
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
    const action = block.getFieldValue('drop1');

    return `stagelist.push(\`${myImager.display(wrapStr(nickname),action)}\`);`
}

