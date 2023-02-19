import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import { generateTime } from 'renderer/utils/timestamp';

// 定义JSON格式自定义模块
let blockname="b_case_jump"
// 带有映射的学生名
const jsondesc = {
    "type": `${blockname}`,
    "message0": "运行代码块 %1",
    "args0": [
      {
        "type": "field_number",
        "name": "num1",
        "min": 201,
        "value": 201,
        "max": 300,
        "precision": 1,
      },
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 290,
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
    const number_num1 = block.getFieldValue('num1');//id
    const timestamp=generateTime();

    return `
// 把 支线块被哪个时间戳的跳转使用 push到case_jump_dict的该id的value（一个列表）里
if(${number_num1} in case_jump_dict){
  case_jump_dict['${number_num1}'].push('${timestamp}')
}else{
  case_jump_dict['${number_num1}']=['${timestamp}']
}
stagelist.push(\`jump ${number_num1}${timestamp}PathStart\`);
stagelist.push(\`target ${number_num1}${timestamp}PathBack\`);
`
}

