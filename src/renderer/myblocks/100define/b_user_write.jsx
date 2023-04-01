import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

// 定义JSON格式自定义模块
let blockname="b_user_write"
// 带有映射的学生名
const jsondesc = {
    "type": `${blockname}`,
    "message0": "脚本 %1",
    "args0": [
      {
        "type": "field_multilinetext",
        "name": "val1",
        "text":"//可以是多行\n//文字脚本",
        "spellcheck": false
      },
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "这里你可以填多行文字脚本",
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
    const value_val1 = block.getFieldValue('val1')
    if(value_val1.length==0){
      // 如果该字符串参数空内没有任何变量，忽略掉本代码块
      return ``
    }


    return `stagelist.push(\`${value_val1}\`);`
}

