import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import { generateTime } from 'renderer/utils/timestamp';

// 定义JSON格式自定义模块
let blockname="b_three_button"
// 带有映射的学生名
const jsondesc = {
    "type": `${blockname}`,
    "message0": "第一个按钮，内容： %1 执行 %2 第二个按钮，内容： %3 执行 %4 第三个按钮，内容：%5 执行 %6",
    "args0": [
        {
        "type": "input_value",
        "name": "val1",
        "check": "String"
        },
        {
        "type": "input_statement",
        "name": "sta1"
        },
        {
        "type": "input_value",
        "name": "val2",
        "check": "String"
        },
        {
        "type": "input_statement",
        "name": "sta2"
        },
        {
        "type": "input_value",
        "name": "val3",
        "check": "String"
        },
        {
        "type": "input_statement",
        "name": "sta3"
        }
    ],
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
    const value_val2 = javascriptGenerator.valueToCode(block, 'val2', javascriptGenerator.ORDER_ATOMIC);
    const value_val3 = javascriptGenerator.valueToCode(block, 'val3', javascriptGenerator.ORDER_ATOMIC);
    if(value_val1.length==0||value_val2.length==0||value_val3.length==0){
      // 如果该字符串参数空内没有任何变量，忽略掉本代码块
      return ``
    }
    const statements_sta1=javascriptGenerator.statementToCode(block,'sta1');
    const statements_sta2=javascriptGenerator.statementToCode(block,'sta2');
    const statements_sta3=javascriptGenerator.statementToCode(block,'sta3');





    const timestamp=generateTime();

    return `
stagelist.push(\`button '\${${value_val1}}' '${timestamp+"caseA"}' '\${${value_val2}}' '${timestamp+"caseB"}' '\${${value_val3}}' '${timestamp+"caseC"}'\`);

stagelist.push(\`target ${timestamp+"caseA"}\`)
${statements_sta1.trim()}
stagelist.push(\`jump ${timestamp+"IfFinal"}\`)

stagelist.push(\`target ${timestamp+"caseB"}\`)
${statements_sta2.trim()}
stagelist.push(\`jump ${timestamp+"IfFinal"}\`)

stagelist.push(\`target ${timestamp+"caseC"}\`)
${statements_sta3.trim()}
stagelist.push(\`jump ${timestamp+"IfFinal"}\`)

stagelist.push(\`target ${timestamp+"IfFinal"}\`)

`
}

