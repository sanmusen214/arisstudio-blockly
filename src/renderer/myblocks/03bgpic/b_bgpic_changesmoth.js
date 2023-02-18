import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

// 定义JSON格式自定义模块
let blockname="b_bgpic_changesmoth"
// 带有映射的学生名
const jsondesc = {
    "type": `${blockname}`,
    "message0": "当前背景缓慢退出  然后背景设置为 %1 并 %2",
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
            ["不显示","//"],
            ["逐渐显示","bg show"],
            ["直接显示","bg showD"],
        ]
      }
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
    const value_val1 = javascriptGenerator.valueToCode(block, 'val1', javascriptGenerator.ORDER_ATOMIC);
    if(value_val1.length==0){
      // 如果该字符串参数空内没有任何变量，忽略掉本代码块
      return ``
    }
    const dropdown_drop1 = block.getFieldValue('drop1');



    return `
stagelist.push(\`bg hide\`);
stagelist.push(\`wait 1\`);
stagelist.push(\`bg change \${${value_val1}}\`);
stagelist.push(\`${dropdown_drop1}\`)
`
}

