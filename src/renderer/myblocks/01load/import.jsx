import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';


// 定义JSON格式自定义模块
const jsondesc = {
    "type": "import",
    "message0": "导入 %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "include",
        "align": "CENTRE"
      }
    ],
    "colour": 230,
    "tooltip": "",
    "helpUrl": "",
    "previousStatement": null,
    "nextStatement": null,
  }

// 注入自定义模块
Blockly.Blocks['import'] = {
    init: function () {
        this.jsonInit(jsondesc);
    }
}

// 为自定义块添加js语言生成器
javascriptGenerator['import'] = function (block) {
    // 数字
    const rights = javascriptGenerator.statementToCode(block, 'include');
    if(rights.length==0){
      return ""
    }
    return `
importArea=true;
${rights}
stagelist.push("load end");
importArea=false;
`
}