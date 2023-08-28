import React from 'react'
import { Button, Row, Col, Popconfirm, message } from 'antd'
import {
    DownloadOutlined,
    SaveOutlined,
    CodeOutlined,
    ContainerOutlined,
    SolutionOutlined,
    NotificationOutlined,
    BgColorsOutlined,
    UserOutlined,
    ProfileOutlined,
    CalendarOutlined
  } from '@ant-design/icons';
import "./SettingPage.css"


export default function SettingPage({
    version,
    loadProject,
    saveProject,
    openSourcePage,
    selectFilepath,
    downloadCode,
    getChattxt,
    getChatscript,
    changeTheme,
    darktheme,
    showres,
    setShowres,
    showtool,
    setShowtool,
    confirmclear
}) {
  return (
    <div>
        <br/>
        <Row justify={"start"} align={"middle"}>
            <span style={{marginRight:5}}>当前版本：{version}</span>
            <a href='https://github.com/sanmusen214/arisstudio-blockly/releases' target='_blank'><Button>查看更新</Button></a>
        </Row>
        <br/>
        <Row>导入/保存blockly项目</Row>
        <Row justify={"space-between"}>
            <Col>
                <Button className="loadprojectButton"><input type="file" name="file" accept='*' className="projectfile" onChange={loadProject} onClick={()=>{message.destroy();message.info("记得保存当前项目！！！")}}></input><DownloadOutlined />导入blockly项目</Button>
                <Button onClick={saveProject}><SaveOutlined />保存blockly项目</Button>
            </Col>
            <Col>
                <Popconfirm
                    title="清空积木区"
                    description="这会清空当前积木区内容，记得保存！"
                    onConfirm={confirmclear}
                    onCancel={()=>{}}
                    okText="清空！"
                    cancelText="取消"
                >
                    <Button danger>清空积木区</Button>
                </Popconfirm>
            </Col>
        </Row>
        <br/>
        <Row>导出脚本</Row>
        <Row>
            {window.wfilepath?<>当前自动导出: {window.wfilepath}</>:<></>}
        </Row>
        <Row>
            {window.isinWebpageMode?<></>:<><Button className="loadprojectButton"><input type="file" name="file" accept='text/plain' className="projectfile" onChange={selectFilepath}></input><CodeOutlined />{window.wfilepath?"重设":"设定"}自动导出</Button></>}
            
            <Button onClick={downloadCode}><ContainerOutlined/>导出脚本</Button>
        </Row>
        <br/>
        <Row>AI语音</Row>
        <Row>
            <Button onClick={getChattxt}><SolutionOutlined/>导出语音文本</Button>
            <Button onClick={getChatscript}><NotificationOutlined/>导出含语音脚本</Button>
        </Row>
        <br/>
        <Row>显示模式</Row>
        <Row>
            <Button onClick={changeTheme}><BgColorsOutlined />{darktheme?"转亮色模式":"转暗黑模式"}</Button>
        </Row>
        <br/>
        <Row>
        右侧当前显示：{showres?"脚本":"状态"}
        </Row>
        <Row>
            <Button onClick={()=>{
                setShowtool((tool)=>{return !tool})
            }}><CalendarOutlined />{showtool?"隐藏右侧框":"显示右侧框"}</Button>
            <Button onClick={()=>setShowres(!showres)}>{showres?<><UserOutlined /> 转显示人物状态</>:<><ProfileOutlined /> 转显示文本脚本</>}</Button>
        </Row>
    </div>
  )
}
