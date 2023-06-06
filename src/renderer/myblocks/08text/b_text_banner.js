import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import myTexter from 'renderer/models/textcmd';
import { wrapStr } from 'renderer/utils/DataTool';

// 定义JSON格式自定义模块
let blockname="b_text_banner"
// 带有映射的学生名
const jsondesc = {
    "type": `${blockname}`,
    "message0": "横幅 主标题 %1 副标题 %2 小标题 %3",
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
    const main = javascriptGenerator.valueToCode(block, 'val1', javascriptGenerator.ORDER_ATOMIC);
    const second = javascriptGenerator.valueToCode(block, 'val2', javascriptGenerator.ORDER_ATOMIC);
    const third = javascriptGenerator.valueToCode(block, 'val3', javascriptGenerator.ORDER_ATOMIC);

    if(third!="''"){
      return `stagelist.push(\`${myTexter.banner3(wrapStr(main),wrapStr(second),wrapStr(third))}\`);`
    }
    if(second!="''"){
      return `stagelist.push(\`${myTexter.banner2(wrapStr(main),wrapStr(second))}\`);`
    }
    return `stagelist.push(\`${myTexter.banner(wrapStr(main))}\`);`
}

