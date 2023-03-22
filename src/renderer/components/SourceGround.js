import React, { useEffect, useState } from 'react'
import {Tabs, Input} from 'antd'

import BcgTab from './tabmenu/BcgTab'
import BgmTab from './tabmenu/BgmTab'
import CoverTab from './tabmenu/CoverTab'
import SoundTab from './tabmenu/SoundTab'
import SETab from './tabmenu/SETab'
import SprTab from './tabmenu/SprTab'
import {Howler} from 'howler'

const {Search} = Input


const itemstyle={height:document.body.clientHeight*0.75+"px",overflow:'auto'}

/**
 * 给定五文件类型，构建tab列表
 * bgm,bcg,cover,sound,spr
 */
const buildItems=(itemlistmap)=>{
  return [
    {
      key: 'bgm',
      label: `背景音乐`,
      children: <BgmTab style={itemstyle} bgmlist={itemlistmap.bgm} />,
    },
    {
      key: 'bcg',
      label: `背景图`,
      children: <BcgTab style={itemstyle} bcglist={itemlistmap.bcg} />,
    },
    {
      key: 'cover',
      label: `覆盖图`,
      children: <CoverTab style={itemstyle} coverlist={itemlistmap.cover}/>,
    },
    {
      key: 'sound',
      label: `音效`,
      children: <SoundTab style={itemstyle} soundlist={itemlistmap.sound}/>,
    },
    {
      key: 'sedesc',
      label: `音效速查`,
      children: <SETab style={itemstyle} soundlist={itemlistmap.sound} />,
    },
    {
      key: 'spr',
      label: `人物`,
      children: <SprTab style={itemstyle} sprlist={itemlistmap.spr}/>,
    },
  ]
}

function SourceGround(props) {

  // console.log(props.sourcemap)

  const [items,setItems] = useState(buildItems({
    "bgm":props.sourcemap.get('bgm'),
    "bcg":props.sourcemap.get("bcg"),
    "cover":props.sourcemap.get("cover"),
    "sound":props.sourcemap.get("sound"),
    "spr":props.sourcemap.get("spr")
  }))

  useEffect(()=>{
    setItems(buildItems({
      "bgm":props.sourcemap.get('bgm'),
      "bcg":props.sourcemap.get("bcg"),
      "cover":props.sourcemap.get("cover"),
      "sound":props.sourcemap.get("sound"),
      "spr":props.sourcemap.get("spr")
    }))
  },[props.sourcemap])

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

    setItems(buildItems({
      "bgm":postlist[0],
      "bcg":postlist[1],
      "cover":postlist[2],
      "sound":postlist[3],
      "spr":postlist[4],
    }))
  }

  return (
    <div id="sourceground">
      <Search placeholder="搜索关键字(不区分大小写)" allowClear onSearch={onSearch} style={{ width: 300 }} />
      <Tabs defaultActiveKey='bgm' animated={false} 
      destroyInactiveTabPane={true}
      items={items} onChange={()=>{Howler.stop()}}/>
    </div>
  )
}

export default SourceGround