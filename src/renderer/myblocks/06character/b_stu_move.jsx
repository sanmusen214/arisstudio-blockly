import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import { students_datamap } from '../../datamap';

// 定义JSON格式自定义模块
let blockname="b_stu_move"
// 带有映射的学生名
const jsondesc = {
    "type": `${blockname}`,
    "message0": "人物昵称 %1 动作 %2 (位置%3 速度 %4)",
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
            ["靠近(忽略右侧参数)","close"],
            ["后退(忽略右侧参数)","back"],
            ["往x轴","moveX"],
            ["往y轴","moveY"],
            ["点头(忽略参数)","nod"],
            ["小跳(忽略参数)","jump"],
            ["跳两下(忽略参数)","jump2"],
            ["小颤抖(忽略参数)","sshake"],
            ["大颤抖(忽略参数)","bshake"]
        ]
      },
      {
        "type": "field_number",
        "name": "num1",
        "min": -1000,
        "value": 0,
        "max": 1000,
        "precision": 0.1,
      },
      {
        "type": "field_number",
        "name": "num2",
        "min": -1000,
        "value": 10,
        "max": 1000,
        "precision": 0.1,
      },
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120,
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
    const number_val1 = block.getFieldValue('num1');
    const number_val2 = block.getFieldValue('num2');

    if(dropdown_drop1==="close"||dropdown_drop1==="back"){
        return `
stagelist.push(\`\${${value_val1}} ${dropdown_drop1}\`);
`
    }else if(dropdown_drop1==="moveX"||dropdown_drop1==="moveY"){
        return `
stagelist.push(\`\${${value_val1}} ${dropdown_drop1} ${number_val1} ${number_val2}\`);
`
    }else if(dropdown_drop1==="nod"){
      return `
stagelist.push(\`\${${value_val1}} shakeY 3 -6 1\`);
`
    }else if(dropdown_drop1==="jump"){
      return `
stagelist.push(\`\${${value_val1}} shakeY 7 4 1\`);
`
    }else if(dropdown_drop1==="jump2"){
      return `
stagelist.push(\`\${${value_val1}} shakeY 4 4 1\`);
stagelist.push(\`wait 0.3\`);
stagelist.push(\`\${${value_val1}} shakeY 4 3 1\`);
      `
    }else if(dropdown_drop1==="sshake"){
      return `
stagelist.push(\`\${${value_val1}} shakeX 15 1 6\`);
`
    }else if(dropdown_drop1==="bshake"){
      return `
stagelist.push(\`\${${value_val1}} shakeX 20 2 6\`);
`
    }

}

