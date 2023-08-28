import React from 'react'
import { Divider } from 'antd';


export default function HelpTab(props) {

    return (
        <div style={props.style}>
        <h1>常见问题</h1>
        <Divider />

        <h2>素材导入后 AS控制台 "key does not exist in the dictionary"</h2>
        素材代号不应当有空格，最好是英文，顺便检查导入时和使用时是不是代号的字打的不一样<br/>
        加载人物不需要文件名后缀，其他如背景和音乐的导入都需要文件名后缀<br/><br/>
        错误示例： <code>加载人物代号"<code  style={{color:'red'}}>小 桃</code>"人物对象 桃井 普通状态</code><br />
        正确示例： <code>加载人物代号"<code style={{color:'green'}}>小桃</code>"人物对象 桃井 普通状态</code><br />

        <Divider />

        <h2>可视化预览素材失败或爱丽丝工坊加载素材失败</h2>
        根据<a href="https://github.com/Tualin14/ArisStudio/wiki" target="_blank">说明</a>将文件放进正确的位置。注意character文件夹是放自定义png人物的地方，spr文件夹是放游戏里spr人物素材的地方。
        <br />
        此外请注意自己的spr人物文件是否有<span style={{color:'red'}}>.assets</span>后缀，如果有请删除后缀，否则无法加载。

        <Divider />

        <h2>拖动积木区域会卡</h2>
        积木多了拖动会卡，卡的根本原因是拖动会导致频繁渲染积木
        <br />
        善用主线块，将剧情分成多个主线块，适当使用函数功能，减少积木数量
        <br />
        建议使用鼠标滚轮来控制上下，按住Shift和滚鼠标滚轮来控制左右，减少屏幕渲染次数。
        <br />
        或者将故事拆分，每次黑屏转场为分割点，分成多个脚本制作
        <br />
        或者学习文字脚本命令

        <Divider />

        <h2>有些积木不知道怎么用</h2>
        积木拽出来，鼠标悬停在上面会有提示，或者<a href="https://space.bilibili.com/7331920?spm_id_from=333.1007.0.0" target="_blank">看可视化视频教程</a>或<a href="https://github.com/Tualin14/ArisStudio/wiki" target="_blank">爱丽丝工坊文档</a>或群里问人：647177204

        <Divider />
        
        <h2>预览脸部差分时位置不对</h2>
        尝试切换‘识别脸部’与‘固定位置’两个模式，实在不行的话就取消面部差分，在普通模式下用人物右上角的Animation自己查看或用爱丽丝工坊的Preview

        <Divider />


        <h2>我想用爱丽丝工坊的选择按钮和可视化的变量做计算器</h2>
        很可惜，变量块仅限在可视化工具中使用，其使用方式是在函数内包装动作或方法，可视化工具本质是字符串生成器，爱丽丝工坊也无法提供变量的运行时，所以无法做计算器。
        
        <Divider />

        <h2>我想用爱丽丝工坊做galgame</h2>
        请使用爱丽丝工坊的按钮以及可视化的函数功能，请勿使用变量做好感度，理由同上
        <br />
        上述做出来的galgame无法进行打包分发，使用OBS录制互动视频吧

        <Divider />

        <h2>其他问题</h2>
        请加群：647177204
        <br />
        


        
        </div>)
}
