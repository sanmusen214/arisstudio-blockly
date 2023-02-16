import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';


// 定义JSON格式自定义模块
const jsondesc = {
  "type": "b_load",
  "message0": "加载 %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "sta1",
      "align": "RIGHT"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 260,
  "tooltip": "",
  "helpUrl": ""
  }

// 注入自定义模块
Blockly.Blocks['b_load'] = {
    init: function () {
        this.jsonInit(jsondesc);
    }
}

// 为自定义块添加js语言生成器
javascriptGenerator['b_load'] = function (block) {
    // 数字
    const rights = javascriptGenerator.statementToCode(block, 'sta1');
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