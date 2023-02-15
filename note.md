# 开发小笔记：

# 参数的使用

blockly变量块传出的是变量名。

假如一个blockly界面的变量名为param1，内容是字符串hello。

该变量在用到这个变量的块的值接口叫val1

拼接生成脚本的代码的字符串时直接用

```javascript
const blocklyparamVal1=javascriptGenerator.valueToCode(block, 'val1', javascriptGenerator.ORDER_ATOMIC);
return `stagelist.push(\`load \${${blocklyparamVal1}}\`);`
```

即在生成的代码中，strlist中的这个元素为'load hello'