import React from 'react'
import {Tabs} from 'antd'

import BcgTab from './tabmenu/BcgTab'
import BgmTab from './tabmenu/BgmTab'
import CoverTab from './tabmenu/CoverTab'
import SoundTab from './tabmenu/SoundTab'
import SprTab from './tabmenu/SprTab'
import {Howler} from 'howler'


function SourceGround(props) {

  // console.log(props.sourcemap)

  const itemstyle={height:document.body.clientHeight*0.60+"px",overflow:'auto'}

  const items = [
    {
      key: 'bgm',
      label: `背景音乐`,
      children: <BgmTab style={itemstyle} bgmlist={props.sourcemap.get('bgm')} />,
    },
    {
      key: 'bcg',
      label: `背景图`,
      children: <BcgTab style={itemstyle} bcglist={props.sourcemap.get('bcg')} />,
    },
    {
      key: 'cover',
      label: `覆盖图`,
      children: <CoverTab style={itemstyle} coverlist={props.sourcemap.get('cover')}/>,
    },
    {
      key: 'sound',
      label: `音效`,
      children: <SoundTab style={itemstyle} soundlist={props.sourcemap.get('sound')}/>,
    },
    {
      key: 'spr',
      label: `人物`,
      children: <SprTab style={itemstyle} sprlist={props.sourcemap.get('spr')}/>,
    },
  ];

  return (
    <div id="sourceground">
      <Tabs defaultActiveKey='bgm' animated={false} items={items} destroyInactiveTabPane={true} onChange={()=>{Howler.stop()}}/>
    </div>
  )
}

export default SourceGround