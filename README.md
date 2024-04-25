
# Todo

- [ ] ~~Add i18n~~.
- [ ] ~~Use local Backend server to load source automatically~~.

This project is archived since the <a href="https://github.com/Tualin14/ArisStudio">AS</a> is archived.
由于<a href="https://github.com/Tualin14/ArisStudio">AS</a>停止开发，本项目即将归档

<img src="https://github.com/sanmusen214/arisstudio-blockly/blob/main/src/renderer/media/document/cover.png"></img>

# 使用前的准备

1. 首先需要在<a href="https://github.com/Tualin14/ArisStudio">爱丽丝工坊项目</a>下载Releases包并解压，同时需要按照文档说明下载数据资源并放入Data文件夹，请确保你能正常使用ArisStudio.exe。
2. 下载本项目的Releases包并解压出exe文件或使用浏览器访问`https://sanmusen214.github.io/arisstudio-blockly/`，即可开始堆搭积木。使用浏览器网页的话则自动保存功能不可用。
  - 如果你使用的是exe程序，则可以使用自动保存功能，点击右上角的`开始设定自动导出`按钮选择一个爱丽丝工坊项目的`0Txt`文件夹下的txt文件。之后你堆搭的积木都会自动保存到该txt文件里。
  - 如果你使用的是浏览器网页，每次想要获得脚本时，点击页面右上角`导出脚本`即可选择保存txt至ArisStudio的`0Txt`文件夹下，或者打开脚本框进行文本的复制粘贴。
3. 在ArisStudio中加载刚才导出的txt即可。
4. 右上角的导入与导出blockly项目可以从以前的可视化项目文件中恢复内容，或把当前可视化积木保存下来。


# 如何使用

<img src="https://github.com/sanmusen214/arisstudio-blockly/blob/main/src/renderer/media/document/easystart.png"></img>

简单地拖动左侧组件到主界面中即可构建用于ArisStudio的脚本，不过有以下几点需要注意：

1. 所有积木必须放在`主线块`里，先运行主线块1，随后运行主线块2，以此类推
2. 加载人物以及加载背景的块必须放在`加载块`里，`加载块`需放置于脚本开头
3. 场上不能同时有两个`主线块1`，或两个`主线块2`，以此类推
4. 所有文字块里尽量不含空格，可以使用下划线_来替代空格。被中括号包裹的区域除外

# 教程

这里是<a href="https://www.bilibili.com/video/BV1M14y1q7vt/">视频教程</a>

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
