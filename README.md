<img src=".erb/img/erb-banner.svg" width="100%" />

<br>

<p>
  Electron React Boilerplate uses <a href="https://electron.atom.io/">Electron</a>, <a href="https://facebook.github.io/react/">React</a>, <a href="https://github.com/reactjs/react-router">React Router</a>, <a href="https://webpack.js.org/">Webpack</a> and <a href="https://www.npmjs.com/package/react-refresh">React Fast Refresh</a>.
</p>

<br>

<div align="center">

[![Build Status][github-actions-status]][github-actions-url]
[![Github Tag][github-tag-image]][github-tag-url]
[![Discord](https://badgen.net/badge/icon/discord?icon=discord&label)](https://discord.gg/Fjy3vfgy5q)

[![OpenCollective](https://opencollective.com/electron-react-boilerplate-594/backers/badge.svg)](#backers)
[![OpenCollective](https://opencollective.com/electron-react-boilerplate-594/sponsors/badge.svg)](#sponsors)
[![StackOverflow][stackoverflow-img]][stackoverflow-url]

</div>

<img src="https://github.com/sanmusen214/arisstudio-blockly/blob/main/src/renderer/media/document/cover.png"></img>

# 开始使用ArisStudio-Blockly可视化工具生成脚本

1. 首先需要在<a href="https://github.com/Tualin14/ArisStudio">爱丽丝工坊项目</a>下载Releases包并解压，同时需要按照文档说明下载数据资源并放入Data文件夹，请确保你能正常打开ArisStudio.exe。
2. 下载本项目的Releases包并解压出exe文件或使用浏览器访问`https://sanmusen214.github.io/arisstudio-blockly/`，即可开始堆搭积木。如果你使用的是浏览器网页，则自动保存功能不可用，因此强烈建议下载Release来获得更好的操作体验。
3. 如果你使用的是exe程序，则可以使用自动保存功能，点击右上角的`开始设定自动导出`按钮选择一个爱丽丝工坊项目的`0Txt`文件夹下的txt文件。之后你堆搭的积木都会自动保存到该文件里。
4. 如果你使用的是浏览器网页，每次想要获得脚本时，点击页面右上角`导出脚本`即可选择保存txt至ArisStudio的`0Txt`文件夹下，或者打开脚本框进行文本的复制粘贴。
5. 在ArisStudio中加载你刚才导出的txt即可。
6. 右上角的导入与导出blockly项目可以从以前的可视化项目文件中恢复内容，或把当前积木状态保存为新的项目文件。


# 如何构建

简单地拖动左侧组件到主界面中即可构建用于ArisStudio的脚本，不过有以下几点需要注意：

1. 只有被`主线块`包裹的代码块会真正实行，`主线块`内的代码块会按照`主线块`的编号从小到大依次执行，块的编号不必连续，如果你的场上只有`主线块1`和`主线块5`，那么这两个块会依次先后执行。
2. 所有加载大类里的块必须被`加载块`包裹，防止由于缺少load end导致的错误。在`加载块`之外的加载类的块都不会实行。
3. 标有`(唯一)`字段的同一类块不能以同一id重复。举个例子，场上不能同时有两个`主线块1`。
4. 字符串块在`其他块`大类的最后一位，如你所见，字符串块和变量块的插槽是一样的，这意味着他们可以等价使用。但是请注意变量块的名字不代表其值，其值是它被赋值的时候的右侧字符串块。推荐初始化中文名的变量名，并给其赋值为拼音。
5. 所有字符串块里尽量不含空格，使用下划线_来替代空格。被中括号包裹的字符串块除外
6. 你可以将同一id的`运行支线块`视为`定义支线块`内的代码，引入`代码块`的目的是避免积木高度过高（尤其是有多项选择的情况下）


综上比较推荐的做法是使用`主线块1`赋值所有变量，然后使用`主线块2`放置`加载块`，然后在其内加载所有所需的资源。在之后的`主线块`中放置任何其他积木块

# 字太多了不想看？

<a href="https://www.bilibili.com/video/BV1As4y1h79u/?spm_id_from=333.999.0.0">视频教程</a>

demo文件在<a href="https://github.com/sanmusen214/arisstudio-blockly/blob/main/src/renderer/media/sampleproject">这里下载</a>，进入网页后点击某个文件，然后点击内容框右上角Blame按钮，然后鼠标右键另存为即可保存

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

## Docs

See our [docs and guides here](https://electron-react-boilerplate.js.org/docs/installation)

## Community

Join our Discord: https://discord.gg/Fjy3vfgy5q

## Sponsors

<a href="https://palette.dev">
  <img src=".erb/img/palette-sponsor-banner.svg" width="100%" />
</a>

## Donations

**Donations will ensure the following:**

- 🔨 Long term maintenance of the project
- 🛣 Progress on the [roadmap](https://electron-react-boilerplate.js.org/docs/roadmap)
- 🐛 Quick responses to bug reports and help requests

## Backers

Support us with a monthly donation and help us continue our activities. [[Become a backer](https://opencollective.com/electron-react-boilerplate-594#backer)]

<a href="https://opencollective.com/electron-react-boilerplate-594/backer/0/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/0/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/1/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/1/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/2/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/2/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/3/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/3/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/4/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/4/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/5/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/5/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/6/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/6/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/7/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/7/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/8/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/8/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/9/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/9/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/10/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/10/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/11/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/11/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/12/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/12/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/13/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/13/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/14/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/14/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/15/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/15/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/16/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/16/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/17/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/17/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/18/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/18/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/19/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/19/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/20/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/20/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/21/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/21/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/22/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/22/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/23/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/23/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/24/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/24/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/25/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/25/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/26/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/26/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/27/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/27/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/28/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/28/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/29/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/29/avatar.svg"></a>

## Sponsors

Become a sponsor and get your logo on our README on Github with a link to your site. [[Become a sponsor](https://opencollective.com/electron-react-boilerplate-594-594#sponsor)]

<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/0/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/1/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/2/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/3/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/4/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/5/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/6/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/7/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/8/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/9/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/9/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/10/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/10/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/11/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/11/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/12/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/12/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/13/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/13/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/14/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/14/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/15/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/15/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/16/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/16/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/17/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/17/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/18/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/18/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/19/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/19/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/20/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/20/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/21/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/21/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/22/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/22/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/23/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/23/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/24/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/24/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/25/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/25/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/26/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/26/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/27/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/27/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/28/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/28/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/29/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/29/avatar.svg"></a>

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
