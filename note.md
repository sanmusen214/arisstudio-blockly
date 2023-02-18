# 开发小笔记：

## 参数的使用

blockly变量块传出的是变量名。

假如一个blockly界面的变量名为param1，内容是字符串hello。

该变量在用到这个变量的块的值接口叫val1

定义代码块里，拼接生成脚本的代码的字符串时直接用

```javascript
const blocklyparamVal1=javascriptGenerator.valueToCode(block, 'val1', javascriptGenerator.ORDER_ATOMIC);
return `stagelist.push(\`load \${${blocklyparamVal1}}\`);`
```

即在生成的代码中，strlist中的这个元素为'load hello'

## 时间戳

每次触发重新构造代码块前都会`window.numinbigfunc=0`

`utils/timestamp`里的generateTime函数每次被调用时，都会读取这个window.numinbigfunc，然后使其自增1。定义积木块的生成字符串时，调用generateTime，即可获得一个独一无二的字符串，便于设置各种按钮跳转结构或分支块结构。

## 生成js码

主线:stagelist每段stage代码【1-100】，resmap存每个stage序号和结果串，errorset存冲突的序号

按钮if块：使用时间戳作id，不会重复

支线：支线相关块需要指定一个支线id（caseset记录定义过的`跳转到支线`块，caseerrorset记录重合的`跳转到支线块`，反馈给用户）。

支线承载块在数据存储上和主线块相同，不过使用主线块后面的区域，支线id是stagelist每段支线代码【201-300】，resmap存每个定义支线块序号和结果串，errorset存冲突的定义支线块的序号

### 按钮的设计

按钮if（id=42）

A分支，target 42caseA。A分支结束时，jump 42IfFinal。

B分支，target 42caseB。B分支结束时，jump 42IfFinal。

ifcase块的最后target 42IfFinal

### 支线的设计

通过创建resmap里字符串的副本的方式，模拟实现多次调用，实际是核心内容复制粘贴，开头结尾不同。使得`跳转到支线n`块可以多次使用

以A块跳转块，B块定义块为例，在构造出来的js代码里新建一个引用记录case_jump_dict，广场上所有块生成代码时，记录所有`跳转到支线块B`的跳转块（A）的时间戳id( 字典内容 {支线块B的id : [ 第一个跳转到支线块B的时间戳，第二个跳转到支线块B的时间戳] )，然后在sortMap后面的循环里，每个时间戳添加一份相应的支线块B的脚本段（A知道自己时间戳和B的id，B知道自己id，B在合成阶段知道A时间戳，主线里A跳转块跳到支线B块，Z跳转块跳到支线B块，最后生成的时候B块的resMap会push两个脚本段，一个负责A，一个负责B）

具体设计如下：

`codetool`开头：定义case_jump_dict 一个Map来存储调用关系

`跳转到支线`块，获得用户输入id（201到300）以及时间戳：blockly代码块定义阶段，在开头stagelist.push(jump id+时间戳+'PathStart')，结尾stagelist.push(jump id+时间戳+'PathBack'),同时stagelist.push(一个逻辑代码)，逻辑内容差不多是给case_jump_dict的id对应的列表添加{时间戳}作为一个新元素

- 初始化met200=false, 当sortMap合并的时候遇到>200的id且还是false（说明来到支线部分），置为true，然后添加jump wholeProjectTail。整个sortMap合并完。target wholeProjectTail

`定义支线`块，获得用户输入id（201到300），然后blockly代码块定义阶段内只有statement内容。在codetool代码后面resMap合并时，for循环里判断id>200，则对case_jump_dict[ id ]列表里的每个时间戳，往rescode里加 target id+时间戳+'PathStart'，然后是thisvaluecode，然后是 jump id+时间戳+'PathBack'