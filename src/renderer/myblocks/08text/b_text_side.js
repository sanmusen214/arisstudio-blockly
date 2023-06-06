import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import myTexter from 'renderer/models/textcmd';
import { wrapStr } from 'renderer/utils/DataTool';

// 定义JSON格式自定义模块
let blockname="b_text_side"
// 带有映射的学生名
const jsondesc = {
    "type": `${blockname}`,
    "message0": "%1 文本框 内容 %2 %3",
    "args0": [
        {
        "type": "field_dropdown",
        "name": "drop1",
        "options": [
            ["中部","middle"],
            ["底部","bottom"],
        ]
        },
      {
        "type": "input_value",
        "name": "val1",
        "check": "String"
      },
      {
        "type": "field_dropdown",
        "name": "drop2",
        "options": [
            ["有断点","break"],
            ["无断点","continue"],
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
    const content = javascriptGenerator.valueToCode(block, 'val1', javascriptGenerator.ORDER_ATOMIC);

    const position = block.getFieldValue('drop1');
    const action = block.getFieldValue('drop2');


    return `stagelist.push(\`${myTexter.sidetext(wrapStr(content),position,action==="continue"?true:false)}\`);`
}

