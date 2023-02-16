# 开发小笔记：

## 参数的使用

blockly变量块传出的是变量名。

假如一个blockly界面的变量名为param1，内容是字符串hello。

该变量在用到这个变量的块的值接口叫val1

拼接生成脚本的代码的字符串时直接用

```javascript
const blocklyparamVal1=javascriptGenerator.valueToCode(block, 'val1', javascriptGenerator.ORDER_ATOMIC);
return `stagelist.push(\`load \${${blocklyparamVal1}}\`);`
```

即在生成的代码中，strlist中的这个元素为'load hello'

## 生成码中变量含义

主线:stagelist每段stage代码【1-100】，resmap存每个stage序号和结果串，errorset存冲突的序号

if块：使用时间戳作id，不会重复

支线：跳转到支线块需要指定一个支线id（在caseerrorset里防重合）,而支线承载块等价于stagelist，略有不同

支线id是stagelist每段支线代码【201-300】，resmap存每个stage序号和结果串，errorset存冲突的序号

### 支线的设计

if（id=42）的每个case分支开始（比如A分支），target 42caseA。A分支结束时，jump 42IfFinal。ifcase的最后target 42IfFinal

支线是一个上下可连结的代码块，假设支线id=254，则跳转到支线块返回的字符串中开头要jump 254PathStart，末尾要target 254PathBack。

支线承载块如同stagelist，【201-300】，自己有个id 254，开头target 254PathStart，末尾jump 234PathBack

met200=false, 当stagelist合并的时候遇到>200的id且还是false，置为true，然后添加jump wholeProjectTail。整个stagelist合并完。target wholeProjectTail