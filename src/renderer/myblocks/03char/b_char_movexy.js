import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import myCharer from 'renderer/models/charcmd';
import { wrapStr } from 'renderer/utils/DataTool';

// 定义JSON格式自定义模块
let blockname="b_char_movexy"
// 带有映射的学生名
const jsondesc = {
    "type": `${blockname}`,
    "message0": "人物昵称 %1 移动至横轴: %2 纵轴: %3, 耗时 %4 秒",
    "args0": [
      {
        "type": "input_value",
        "name": "val1",
        "check": "String"
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
        "value": 0,
        "max": 1000,
        "precision": 0.1,
      },
      {
        "type": "field_number",
        "name": "num3",
        "min": 0,
        "value": 0,
        "max": 100,
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
    const xx = block.getFieldValue('num1');
    const yy = block.getFieldValue('num2');
    const spendtime = block.getFieldValue('num3');


    return `stagelist.push(\`${myCharer.movexy(wrapStr(nickname),xx,yy,spendtime)}\`);`
}

