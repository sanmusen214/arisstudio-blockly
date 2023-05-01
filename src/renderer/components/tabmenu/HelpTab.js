import React from 'react'
import { Divider } from 'antd';


export default function HelpTab(props) {

    return (
        <div style={props.style}>
        <h1>常见问题</h1>
        <h2>素材导入后 AS控制台 "key does not exist in the dictionary"</h2>
        素材昵称不应当有空格，最好是英文，顺便检查导入时和使用时是不是字打的不一样<br/>
        加载人物素材不需要打文件名后缀，其他导入都需要文件名后缀<br/><br/>
        错误示例： <code>加载人物昵称"<code  style={{color:'red'}}>日 富 美</code>"人物对象 日富美 普通状态</code><br />
        正确示例： <code>加载人物昵称"<code style={{color:'green'}}>rifumei</code>"人物对象 日富美 普通状态</code><br />

        <Divider />

        <h2>拖动积木区域会卡</h2>
        积木多了会卡，卡的根本原因未知。建议使用鼠标滚轮来控制上下，按住Shift和滚鼠标滚轮来控制左右，减少屏幕渲染次数。

        <Divider />

        <h2>有些积木不知道怎么用</h2>
        积木拽出来，鼠标悬停在上面会有提示，或者<a href="https://space.bilibili.com/7331920?spm_id_from=333.1007.0.0" target="_blank">看可视化视频教程</a>或<a href="https://github.com/Tualin14/ArisStudio/wiki" target="_blank">爱丽丝工坊文档</a>或群里问人：647177204

        <Divider />
        
        <h2>预览脸部差分时位置不对</h2>
        尝试切换‘识别脸部’与‘固定位置’两个模式，实在不行的话就取消面部差分，在普通模式下用人物右上角的Animation自己查看或用爱丽丝工坊的Preview

        </div>
    )
}
