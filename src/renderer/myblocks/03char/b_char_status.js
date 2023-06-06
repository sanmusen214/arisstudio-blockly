import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import myCharer from 'renderer/models/charcmd';
import { wrapStr } from 'renderer/utils/DataTool';

// 定义JSON格式自定义模块
let blockname="b_char_status"
// 带有映射的学生名
const jsondesc = {
    "type": `${blockname}`,
    "message0": "人物昵称 %1 emo表情 %2 脸部状态 %3 皮肤 %4",
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
            ["无","None"],
            ["注意","Action"],
            ["生气","Aggro"],
            ["胡想","Anxiety"],
            ["谈话","Chat"],
            ["!","E"],
            ["?!","EQ"],
            ["?","Q"],
            ["爱心","Heart"],
            ["...","Idea"],
            ["哼歌","Note"],
            ["害羞","Shy"],
            ["流汗","Sweat"],
            ["闪亮","Twinkle"],
            ["灯泡","Bulb"],
            ["伤心","Sad"],
            ["叹气","Sigh"],
            ["流泪","Tear"],
            ["吹气","Steam"],
        ]
      },
      {
        "type": "input_value",
        "name": "val2",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "val3",
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
    const nickname = javascriptGenerator.valueToCode(block, 'val1', javascriptGenerator.ORDER_ATOMIC);
    const emo = block.getFieldValue('drop1');
    const state = javascriptGenerator.valueToCode(block, 'val2', javascriptGenerator.ORDER_ATOMIC);
    const skin = javascriptGenerator.valueToCode(block, 'val3', javascriptGenerator.ORDER_ATOMIC);

    let resstr=""
    if(emo!="None"){
        resstr+=`stagelist.push(\`${myCharer.emo(wrapStr(nickname),emo)}\`);`
    }
    if(state!="''"){
        resstr+=`stagelist.push(\`${myCharer.state(wrapStr(nickname),wrapStr(state))}\`);`
    }
    if(skin!="''"){
        resstr+=`stagelist.push(\`${myCharer.skin(wrapStr(nickname),wrapStr(skin))}\`);`
    }

    return resstr
}

