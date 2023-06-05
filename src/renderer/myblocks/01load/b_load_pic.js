import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import myLoader from 'renderer/models/loadcmd'
import { wrapStr } from 'renderer/utils/DataTool';
// 定义JSON格式自定义模块
let blockname="b_load_pic"
// 带有映射的学生名
const jsondesc = {
    "type": `${blockname}`,
    "message0": "加载%1图片 昵称 %2 文件名 %3",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "drop1",
            "options": [
                ["背景","bg"],
                ["中景","mg"],
                ["前景","fg"],
            ]
        },
        {
            "type": "input_value",
            "name": "val1",
            "check": "String"
        },
        {
            "type": "input_value",
            "name": "val2",
            "check": "String"
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "前景图片文件需要放在 /data/image/foreground 文件夹中\n中景图片文件需要放在 /data/image/midground 文件夹中\n背景图片文件需要放在 /data/image/background 文件夹中",
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
    const type = block.getFieldValue('drop1');
    const nickname = javascriptGenerator.valueToCode(block, 'val1', javascriptGenerator.ORDER_ATOMIC);
    const filename = javascriptGenerator.valueToCode(block, 'val2', javascriptGenerator.ORDER_ATOMIC);
    

    return `stagelist.push(\`${myLoader.load(type,wrapStr(nickname),wrapStr(filename))}\`);`
}

