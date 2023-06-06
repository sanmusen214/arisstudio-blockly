import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import myTexter from 'renderer/models/textcmd';
import { wrapStr } from 'renderer/utils/DataTool';

// 定义JSON格式自定义模块
let blockname="b_text_txt"
// 带有映射的学生名
const jsondesc = {
    "type": `${blockname}`,
    "message0": "对话 人名 %1 部门 %2 内容 %3 %4",
    "args0": [
      {
        "type": "input_value",
        "name": "val1",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "val2",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "val3",
        "check": "String"
      },
      {
        "type": "field_dropdown",
        "name": "drop1",
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
    const name = javascriptGenerator.valueToCode(block, 'val1', javascriptGenerator.ORDER_ATOMIC);
    const partment = javascriptGenerator.valueToCode(block, 'val2', javascriptGenerator.ORDER_ATOMIC);
    const content = javascriptGenerator.valueToCode(block, 'val3', javascriptGenerator.ORDER_ATOMIC);

    const action = block.getFieldValue('drop1');

    return `stagelist.push(\`${myTexter.text(wrapStr(name),wrapStr(partment),wrapStr(content),action==="continue"?true:false)}\`);`
}

