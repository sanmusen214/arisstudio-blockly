import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

// 定义JSON格式自定义模块
let blockname="b_bgm_control"
// 带有映射的学生名
const jsondesc = {
    "type": `${blockname}`,
    "message0": "设置素材代号 %1 为 %2 并 %3 %4 音量为 %5",
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
            ["背景音乐","bgm"],
            ["音效","se"],
        ]
      },
      {
        "type": "field_dropdown",
        "name": "drop2",
        "options": [
            ["(一次播放)","once"],
            ["(循环播放)","loop"],
        ]
      },
      {
        "type": "field_dropdown",
        "name": "drop3",
        "options": [
            ["立即播放","play"],
            ["先暂停","pause"],
        ]
      },
      {
        "type": "field_number",
        "name": "num1",
        "min": 0,
        "value": 1,
        "max": 1,
        "precision": 0.1,
      },
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 65,
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
    const dropdown_drop1 = block.getFieldValue('drop1');// 类型
    const dropdown_drop2 = block.getFieldValue('drop2');// 次数
    const dropdown_drop3 = block.getFieldValue('drop3');// 状态
    const number_num1 = block.getFieldValue('num1');//音量

    let nowaction="" // 现在状态
    if(dropdown_drop3==="pause"){
      nowaction=`${dropdown_drop1} ${dropdown_drop3}`
    }

    if(dropdown_drop3==="play"){
      return `
stagelist.push(\`${dropdown_drop1} set \${${value_val1}}\`);// 音乐类型
stagelist.push(\`${dropdown_drop1} v ${number_num1}\`);
stagelist.push(\`${dropdown_drop1} ${dropdown_drop2}\`);// 播放次数
`
    }

    return `
stagelist.push(\`${dropdown_drop1} set \${${value_val1}}\`);// 音乐类型
stagelist.push(\`${nowaction}\`);// 立刻状态
stagelist.push(\`${dropdown_drop1} v ${number_num1}\`);
stagelist.push(\`${dropdown_drop1} ${dropdown_drop2}\`);// 播放次数
`
}

