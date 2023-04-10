import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import { generateTime } from 'renderer/utils/timestamp';


// 定义JSON格式自定义模块
let blockname="b_one_button"
// 带有映射的学生名
const jsondesc = {
    "type": `${blockname}`,
    "message0": "%1 单个按钮，内容：[ %2 ] 执行 %3",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "drop1",
        "options": [
            ["出现按钮","0"],
            ["自动选择按钮1","1"],
        ]
      },
      {
        "type": "input_value",
        "name": "val1",
        "check": "String"
      },
      {
        "type": "input_statement",
        "name": "sta1"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 20,
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
      return ``;
    }
    const statements_sta1=javascriptGenerator.statementToCode(block,'sta1');
    const dropdown_drop1 = block.getFieldValue('drop1');
    const wordS=dropdown_drop1!=="0"?'S':'';
    const selnum=wordS?' '+dropdown_drop1:'';

    const timestamp=generateTime();


    return `
function buttonfunc${timestamp}(){
const funcincnum=incnum;
incnum+=1;

stagelist.push(\`button${wordS}${selnum} '\${${value_val1}}' '\${'${timestamp+"caseA"}'+funcincnum}'\`);
stagelist.push(\`target \${'${timestamp+"caseA"}'+funcincnum}\`)
${statements_sta1.trim()}
}

buttonfunc${timestamp}()
`
}

