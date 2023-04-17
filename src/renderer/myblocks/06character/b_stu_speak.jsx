import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import { students_datamap } from '../../datamap';

// 定义JSON格式自定义模块

// 带有映射的学生名
let blockname="b_stu_speak"
const jsondesc = {
    "type": `${blockname}`,
    "message0": "人物昵称 %1 表情 %2 心情 %3 动作 %4",
    "args0": [
      {
        "type": "input_value",
        "name": "val1",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "val2",
        "check": "String"
      },
      {
        "type": "field_dropdown",
        "name": "drop1",
        "options": [
            ["无","none"],
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
      },
      {
        "type": "field_dropdown",
        "name": "drop2",
        "options": [
            ["无","none"],
            ["倒地","down"],
            ["升起","up"],
            ["重置姿态","empty"],
            ["靠近","close"],
            ["后退","back"],
            ["点头","nod"],
            ["小跳","jump"],
            ["跳两下","jump2"],
            ["小颤抖","sshake"],
            ["大颤抖","bshake"]
        ]
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
    const stuname = javascriptGenerator.valueToCode(block, 'val1', javascriptGenerator.ORDER_ATOMIC);//人物昵称
    const face = javascriptGenerator.valueToCode(block, 'val2', javascriptGenerator.ORDER_ATOMIC);//表情

    const emo = block.getFieldValue('drop1');//心情
    const action=block.getFieldValue("drop2");//说话时动作

    // 心情，说话时动作，表情

    let finalcode=""
    if(!stuname){
        return ''
    }
    // 心情
    if(emo!=="none"){
        finalcode+=`
stagelist.push(\`\${${stuname}} emo ${emo}\`);
`
    }
    // 说话时动作
    if(action==="down"){
        finalcode+=`
stagelist.push(\`\${${stuname}} down\`);
`
    }else if(action==="up"){
        finalcode+=`
stagelist.push(\`\${${stuname}} up\`);
`
    }else if(action==="empty"){
        finalcode+=`
stagelist.push(\`\${${stuname}} empty\`);
`
    }else if(action==="close"){
        finalcode+=`
stagelist.push(\`\${${stuname}} close\`);
`
    }else if(action==="back"){
        finalcode+=`
stagelist.push(\`\${${stuname}} back\`);
`
    }else if(action==="nod"){
        finalcode+=`
stagelist.push(\`\${${stuname}} shakeY 3 -8 1\`);
`
    }else if(action==="jump"){
        finalcode+=`
stagelist.push(\`\${${stuname}} shakeY 7 4 1\`);
`
    }else if(action==="jump2"){
        finalcode+=`
stagelist.push(\`\${${stuname}} shakeY 4 5 1\`);
stagelist.push(\`wait 0.3\`);
stagelist.push(\`\${${stuname}} shakeY 4 5 1\`);
`
      }else if(action==="sshake"){
        finalcode+=`
stagelist.push(\`\${${stuname}} shakeX 15 1 6\`);
`
    }else if(action==="bshake"){
        finalcode+=`
stagelist.push(\`\${${stuname}} shakeX 20 2 6\`);
`
    }
    // 表情
    if(face!=="''"){
        finalcode+=`
stagelist.push(\`\${${stuname}} state \${${face}}\`);
`
    }

    return finalcode;
    // return `stagelist.push(\`\${${stuname}} ${dropdown_drop1}\`);`
}

