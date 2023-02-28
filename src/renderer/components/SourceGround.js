import React, { useState } from 'react'
import {Tabs, Input} from 'antd'

import BcgTab from './tabmenu/BcgTab'
import BgmTab from './tabmenu/BgmTab'
import CoverTab from './tabmenu/CoverTab'
import SoundTab from './tabmenu/SoundTab'
import SprTab from './tabmenu/SprTab'
import {Howler} from 'howler'

const {Search} = Input

function SourceGround(props) {

  // console.log(props.sourcemap)

  const itemstyle={height:document.body.clientHeight*0.71+"px",overflow:'auto'}

  const [items,setItems] = useState([
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
  ])


  const onSearch=(word)=>{
    const searchword=word.toLowerCase()
    console.log(searchword)
    let postlist=[[],[],[],[],[]]// 搜索结果
    const prelist=[props.sourcemap.get('bgm'),props.sourcemap.get('bcg'),props.sourcemap.get('cover'),props.sourcemap.get('sound'),props.sourcemap.get('spr')]
    if(word.length!==0){
      // 搜索
      for(let listind in prelist){
        const list=prelist[listind]
        for(let eachfile of list){
          if(eachfile.name.toLowerCase().indexOf(searchword)!==-1){
            postlist[listind].push(eachfile)
          }
        }
      }
    }else{
      postlist=prelist
    }

    setItems([
      {
        key: 'bgm',
        label: `背景音乐`,
        children: <BgmTab style={itemstyle} bgmlist={postlist[0]} />,
      },
      {
        key: 'bcg',
        label: `背景图`,
        children: <BcgTab style={itemstyle} bcglist={postlist[1]} />,
      },
      {
        key: 'cover',
        label: `覆盖图`,
        children: <CoverTab style={itemstyle} coverlist={postlist[2]}/>,
      },
      {
        key: 'sound',
        label: `音效`,
        children: <SoundTab style={itemstyle} soundlist={postlist[3]}/>,
      },
      {
        key: 'spr',
        label: `人物`,
        children: <SprTab style={itemstyle} sprlist={postlist[4]}/>,
      },
    ])
  }

  return (
    <div id="sourceground">
      <Search placeholder="搜索关键字(不区分大小写)" allowClear onSearch={onSearch} style={{ width: 300 }} />
      <Tabs defaultActiveKey='bgm' animated={false} items={items} onChange={()=>{Howler.stop()}}/>
    </div>
  )
}

export default SourceGround