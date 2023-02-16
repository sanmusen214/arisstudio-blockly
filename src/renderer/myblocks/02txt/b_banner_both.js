import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

// 定义JSON格式自定义模块
let blockname="b_banner_both"
// 带有映射的学生名
const jsondesc = {
    "type": `${blockname}`,
    "message0": "标题 大标题 %1 小标题 %2",
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
    // 大标题
    const value_val1 = javascriptGenerator.valueToCode(block, 'val1', javascriptGenerator.ORDER_ATOMIC);
    // 小标题
    const value_val2 = javascriptGenerator.valueToCode(block, 'val2', javascriptGenerator.ORDER_ATOMIC);
    


    return `stagelist.push(\`banner2 \${${value_val2}} \${${value_val1}} \`);`
}

