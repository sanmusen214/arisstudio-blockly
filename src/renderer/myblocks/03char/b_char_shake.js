import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import myCharer from 'renderer/models/charcmd';
import { wrapStr } from 'renderer/utils/DataTool';

// 定义JSON格式自定义模块
let blockname="b_char_shake"
// 带有映射的学生名
const jsondesc = {
    "type": `${blockname}`,
    "message0": "人物昵称 %1 %2 抖动%3秒，幅度 %4 频率 %5",
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
            ["x轴","xs"],
            ["y轴","ys"]
        ]
      },
      {
        "type": "field_number",
        "name": "num1",
        "min": 0,
        "value": 0.5,
        "max": 1000,
        "precision": 0.1,
      },
      {
        "type": "field_number",
        "name": "num2",
        "min": -1000,
        "value": 20,
        "max": 1000,
        "precision": 0.1,
      },
      {
        "type": "field_number",
        "name": "num3",
        "min": -1000,
        "value": 6,
        "max": 1000,
        "precision": 0.1,
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
    const nickname = javascriptGenerator.valueToCode(block, 'val1', javascriptGenerator.ORDER_ATOMIC);
    const axis = block.getFieldValue('drop1');
    
    const spendtime = block.getFieldValue('num1');
    const distance = block.getFieldValue('num2');
    const frequency = block.getFieldValue('num3');

    return `stagelist.push(\`${myCharer.shake(wrapStr(nickname),axis,distance,spendtime,frequency)}\`);`
}

