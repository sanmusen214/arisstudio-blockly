import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

// 定义JSON格式自定义模块
let blockname="b_case_jump"
// 带有映射的学生名
const jsondesc = {
    "type": `${blockname}`,
    "message0": "运行支线(唯一) %1",
    "args0": [
      {
        "type": "field_number",
        "name": "num1",
        "min": 201,
        "value": 201,
        "max": 300,
        "precision": 1,
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
    const number_num1 = block.getFieldValue('num1');


    return `
if(caseset.has(${number_num1})){
  caseerrorset.add(${number_num1});
}
caseset.add(${number_num1});
stagelist.push(\`jump ${number_num1}PathStart\`);
stagelist.push(\`target ${number_num1}PathBack\`);
`
}

