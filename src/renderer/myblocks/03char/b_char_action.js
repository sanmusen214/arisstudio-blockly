import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import myCharer from 'renderer/models/charcmd';
import { wrapStr } from 'renderer/utils/DataTool';

// 定义JSON格式自定义模块
let blockname="b_char_action"
// 带有映射的学生名
const jsondesc = {
    "type": `${blockname}`,
    "message0": "人物昵称 %1 动作 %2",
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
            ["靠近","close"],
            ["远离","back"],
            // ["点头","nod"],
            // ["小跳","jump"],
            // ["跳两下","jump2"],
            // ["小颤抖","sshake"],
            // ["大颤抖","bshake"]
        ]
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
    const action = block.getFieldValue('drop1');
    if(action==="close"||action==="back"){
        return `stagelist.push(\`${myCharer.movein(wrapStr(nickname),action)}\`);`
    }else if(action==="nod"){
      return `stagelist.push(\`${myCharer.nod(wrapStr(nickname))}\`);`
    }else if(action==="jump"){
      return `stagelist.push(\`${myCharer.jump(wrapStr(nickname))}\`);`
    }else if(action==="jump2"){
      return `stagelist.push(\`${myCharer.jump2(wrapStr(nickname))}\`);`
    }else if(action==="sshake"){
      return `stagelist.push(\`${myCharer.sshake(wrapStr(nickname))}\`);`
    }else if(action==="bshake"){
      return `stagelist.push(\`${myCharer.bshake(wrapStr(nickname))}\`);`
    }
}

