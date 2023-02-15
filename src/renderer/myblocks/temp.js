// 模板文件
import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

// 定义JSON格式自定义模块
const jsondesc = {

}

// 注入自定义模块
Blockly.Blocks[''] = {
    init: function () {
        this.jsonInit(jsondesc);
    }
}

// 为自定义块添加js语言生成器
javascriptGenerator[''] = function (block) {
    const fieldvalue = block.getFieldValue('');
    const valuecode = javascriptGenerator.valueToCode(block, '', javascriptGenerator.ORDER_ATOMIC).slice(1,-1);
    return ``
}