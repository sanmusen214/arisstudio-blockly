import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

/**
 * 定义了一个阶段，阶段数字越小，阶段越早进行
 */

// 定义JSON格式自定义模块
const jsondesc = {
    "type": "b_stage",
    "message0": "主线块 %1 %2",
    "args0": [
      {
        "type": "field_number",
        "name": "num1",
        "value": 1,
        "min": 1,
        "max": 100
      },
      {
        "type": "input_statement",
        "name": "sta1"
      }
    ],
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  }

// 注入自定义模块
Blockly.Blocks['b_stage'] = {
    init: function () {
        this.jsonInit(jsondesc);
    }
}

// 为自定义块添加js语言生成器
javascriptGenerator['b_stage'] = function (block) {
    // 阶段数字
    const number_val1 = block.getFieldValue('num1');
    // 阶段右侧代码忽略
    // var value_valeinput = javascriptGenerator.valueToCode(block, 'stageinput', javascriptGenerator.ORDER_ATOMIC);
    // 内部包裹的代码
    const statements_steps = javascriptGenerator.statementToCode(block, 'sta1');
    return `
// 阶段${number_val1}代码
stagelist=[];
${statements_steps.trim()}
if(resmap.has(${number_val1})){
    errorset.add(${number_val1});
}else{
    resmap.set(${number_val1},stagelist.join("\\n")+"\\n");
}
// 阶段${number_val1}代码结束
`
}