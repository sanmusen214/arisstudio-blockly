
# Todo

- [ ] Add i18n.
- [ ] Use local Backend server to load source automatically.
- [ ] Deprecate blockly, use DOM UI. Blockly used to be a good choice but I find it hard to get the context of each block.

<img src="https://github.com/sanmusen214/arisstudio-blockly/blob/main/src/renderer/media/document/cover.png"></img>

# 使用前的准备

1. 首先需要在<a href="https://github.com/Tualin14/ArisStudio">爱丽丝工坊项目</a>下载Releases包并解压，同时需要按照文档说明下载数据资源并放入Data文件夹，请确保你能正常打开ArisStudio.exe。
2. 下载本项目的Releases包并解压出exe文件或使用浏览器访问`https://sanmusen214.github.io/arisstudio-blockly/`，即可开始堆搭积木。如果你使用的是浏览器网页，则自动保存功能不可用，因此强烈建议下载Release来获得更好的操作体验。
3. 如果你使用的是exe程序，则可以使用自动保存功能，点击右上角的`开始设定自动导出`按钮选择一个爱丽丝工坊项目的`0Txt`文件夹下的txt文件。之后你堆搭的积木都会自动保存到该文件里。
4. 如果你使用的是浏览器网页，每次想要获得脚本时，点击页面右上角`导出脚本`即可选择保存txt至ArisStudio的`0Txt`文件夹下，或者打开脚本框进行文本的复制粘贴。
5. 在ArisStudio中加载你刚才导出的txt即可。
6. 右上角的导入与导出blockly项目可以从以前的可视化项目文件中恢复内容，或把当前积木状态保存为新的项目文件。


# 如何使用

简单地拖动左侧组件到主界面中即可构建用于ArisStudio的脚本，不过有以下几点需要注意：

1. 只有被`主线块`包裹的代码块会真正实行，`主线块`内的代码块会按照`主线块`的编号从小到大依次执行，块的编号不必连续，如果你的场上只有`主线块1`和`主线块5`，那么这两个块会依次先后执行。
2. 所有加载大类里的块必须被`加载块`包裹，防止由于缺少load end导致的错误。在`加载块`之外的加载类的块都不会实行。
3. 标有`(唯一)`字段的同一类块不能以同一id重复。举个例子，场上不能同时有两个`主线块1`。
4. 字符串块在`其他块`大类的最后一位，如你所见，字符串块和变量块的插槽是一样的，这意味着他们可以等价使用。但是请注意变量块的名字不代表其值，其值是它被赋值的时候的右侧字符串块。推荐初始化中文名的变量名，并给其赋值为拼音。
5. 所有字符串块里尽量不含空格，使用下划线_来替代空格。被中括号包裹的字符串块除外
6. 你可以将同一id的`运行支线块`视为`定义支线块`内的代码，引入`代码块`的目的是避免积木高度过高（尤其是有多项选择的情况下）


综上比较推荐的做法是使用`主线块1`赋值所有变量，然后使用`主线块2`放置`加载块`，然后在其内加载所有所需的资源。在之后的`主线块`中放置任何其他积木块

# 教程

这里是<a href="https://www.bilibili.com/video/BV1As4y1h79u/?spm_id_from=333.999.0.0">视频教程</a>

demo文件在<a href="https://github.com/sanmusen214/arisstudio-blockly/blob/main/src/renderer/media/sampleproject">这里下载</a>，进入网页后点击某个文件，然后点击内容框右上角Raw按钮，鼠标右键选择另存为，将文件名后缀的.txt去掉只保留.blockly

## Install

Clone the repo and install dependencies:

```bash
git clone --depth 1 --branch main https://github.com/electron-react-boilerplate/electron-react-boilerplate.git your-project-name
cd your-project-name
npm install
```

**Having issues installing? See our [debugging guide](https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues/400)**

## Starting Development

Start the app in the `dev` environment:

```bash
npm start
```

## Packaging for Production

To package apps for the local platform:

```bash
npm run package
```
# Thanks

<p>
  Electron React Boilerplate uses <a href="https://electron.atom.io/">Electron</a>, <a href="https://facebook.github.io/react/">React</a>, <a href="https://github.com/reactjs/react-router">React Router</a>, <a href="https://webpack.js.org/">Webpack</a> and <a href="https://www.npmjs.com/package/react-refresh">React Fast Refresh</a>.

  This project uses <a href="https://github.com/google/blockly">blockly</a> and works with <a href="https://github.com/Tualin14/ArisStudio">ArisStudio</a>.
</p>

## Template Docs

See our [docs and guides here](https://electron-react-boilerplate.js.org/docs/installation)

## Maintainers

- [Amila Welihinda](https://github.com/amilajack)
- [John Tran](https://github.com/jooohhn)
- [C. T. Lin](https://github.com/chentsulin)
- [Jhen-Jie Hong](https://github.com/jhen0409)

## License

MIT © [Electron React Boilerplate](https://github.com/electron-react-boilerplate)

[github-actions-status]: https://github.com/electron-react-boilerplate/electron-react-boilerplate/workflows/Test/badge.svg
[github-actions-url]: https://github.com/electron-react-boilerplate/electron-react-boilerplate/actions
[github-tag-image]: https://img.shields.io/github/tag/electron-react-boilerplate/electron-react-boilerplate.svg?label=version
[github-tag-url]: https://github.com/electron-react-boilerplate/electron-react-boilerplate/releases/latest
[stackoverflow-img]: https://img.shields.io/badge/stackoverflow-electron_react_boilerplate-blue.svg
[stackoverflow-url]: https://stackoverflow.com/questions/tagged/electron-react-boilerplate
