import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import myImager from 'renderer/models/imgcmd';
import { wrapStr } from 'renderer/utils/DataTool';

// 定义JSON格式自定义模块
let blockname="b_pic_move"
// 带有映射的学生名
const jsondesc = {
    "type": `${blockname}`,
    "message0": "图片昵称 %1 移动至 %2 的 %3, 耗时 %4 秒",
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
            ["x轴","xm"],
            ["y轴","ym"],
            ["z轴","zm"]
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
        "min": 0,
        "value": 0,
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
    const distance = block.getFieldValue('num1');
    const spendtime = block.getFieldValue('num2');

    if(axis==="zm"){
      // z轴移动没有时间参数
      return `stagelist.push(\`${myImager.setaxis(wrapStr(nickname),"z",distance)}\`);`
    }



    return `stagelist.push(\`${myImager.moveaxis(wrapStr(nickname),axis,distance,spendtime)}\`);`
}

