import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import { students_datamap } from '../../datamap';

// 定义JSON格式自定义模块
let blockname="b_stu_emo"
// 带有映射的学生名
const jsondesc = {
    "type": `${blockname}`,
    "message0": "学生昵称 %1 角色心情 %2",
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
            ["引起注意","Action"],
            ["生气","Aggro"],
            ["胡思乱想","Anxiety"],
            ["谈话","Chat"],
            ["!","E"],
            ["?!","EQ"],
            ["?","Q"],
            ["爱心","Heart"],
            ["...","Idea"],
            ["哼歌","Note"],
            ["害羞","Shy"],
            ["流汗","Sweat"],
            ["闪闪发光","Twinkle"],
            ["亮灯泡","Bulb"],
            ["伤心","Sad"],
            ["叹气","Sigh"],
            ["流泪","Tear"],
            ["吹气","Steam"],
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

    return `stagelist.push(\`\${${value_val1}} emo ${dropdown_drop1}\`);`
}

