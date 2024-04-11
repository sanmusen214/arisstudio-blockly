import React, { useEffect, useState } from 'react'
import {Tabs, Input,Button, Upload, Divider} from 'antd'

import BcgTab from './tabmenu/BcgTab'
import BgmTab from './tabmenu/BgmTab'
import CoverTab from './tabmenu/CoverTab'
import SoundTab from './tabmenu/SoundTab'
import SETab from './tabmenu/SETab'
import SprTab from './tabmenu/SprTab'
import HelpTab from './tabmenu/HelpTab'
import {Howler} from 'howler'
import { getcnnameof } from 'renderer/datamap'
import { useLocalStorage } from 'renderer/hooks/useLocal'

const {Search} = Input


const itemstyle={height:document.body.clientHeight*0.75+"px",overflow:'auto'}

function SourceGround(props) {

  // console.log("从LocalStorage中读取到的sprdesc",  sprdesc)


  /**
     * 给定五文件类型，构建tab列表
     * bgm,bcg,cover,sound,spr
     */
  const buildItems=(itemlistmap)=>{
    // 由于使用的buildItems，所以这里相当于隔断了重新渲染机制，在这些组件里面刷新父组件的desc，不会导致这些子组件的重新渲染
    return [
      {
        key: 'bgm',
        label: `背景音乐`,
        children: <BgmTab style={itemstyle} bgmlist={itemlistmap.bgm} bgmdesc={props.bgmdesc} setBgmdesc={props.setBgmdesc}/>,
      },
      {
        key: 'bcg',
        label: `背景图`,
        children: <BcgTab style={itemstyle} bcglist={itemlistmap.bcg} bcgdesc={props.bcgdesc} setBcgdesc={props.setBcgdesc} />,
      },
      {
        key: 'cover',
        label: `覆盖图`,
        children: <CoverTab style={itemstyle} coverlist={itemlistmap.cover} coverdesc={props.coverdesc} setCoverdesc={props.setCoverdesc} />,
      },
      {
        key: 'sound',
        label: `音效`,
        children: <SoundTab style={itemstyle} soundlist={itemlistmap.sound} sounddesc={props.sounddesc} setSounddesc={props.setSounddesc} />,
      },
      {
        key: 'sedesc',
        label: `音效速查`,
        children: <SETab style={itemstyle} soundlist={itemlistmap.sound} />,
      },
      {
        key: 'spr',
        label: `人物`,
        children: <SprTab style={itemstyle} sprlist={itemlistmap.spr} sprdesc={props.sprdesc} setSprdesc={props.setSprdesc}/>,
      },
      {
        key: 'help',
        label: `帮助`,
        children: <HelpTab style={itemstyle} />,
      },
    ]
  }

  // console.log(props.sourcemap)
  const loadData=props.loadData
  const [needload,setNeedload]=useState(true)
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
    setItems(buildItems({
      "bgm":[],
      "bcg":[],
      "cover":[],
      "sound":[],
      "spr":[],
    }))

    

    const searchword=word.toLowerCase()
    // console.log(searchword)
    let postlist=[[],[],[],[],[]]// 搜索结果
    const prelist=[props.sourcemap.get('bgm'),props.sourcemap.get('bcg'),props.sourcemap.get('cover'),props.sourcemap.get('sound'),props.sourcemap.get('spr')]
    if(word.length!==0){
      // 搜索
      for(let listind in prelist){
        const list=prelist[listind]
        for(let eachfile of list){
          // 如果搜索词是null，那么就搜索没有desc的那些文件
          if(searchword === "无备注"){
            if((props.sprdesc[eachfile.name.split(".")[0]]||"").length === 0
            &&
            (props.bgmdesc[eachfile.name]||"").length === 0
            &&
            (props.sounddesc[eachfile.name]||"").length === 0
            &&
            (props.bcgdesc[eachfile.name]||"").length === 0
            &&
            (props.coverdesc[eachfile.name]||"").length === 0
            ){
              postlist[listind].push(eachfile)
            }
          }else{
            if(eachfile.name.split(".")[0].toLowerCase().indexOf(searchword)!==-1
            ||
            getcnnameof(eachfile.name.split(".")[0]).indexOf(searchword)!==-1
            ||
            (props.sprdesc[eachfile.name.split(".")[0]]||"").indexOf(searchword)!==-1 // 人名相关文件有多个后缀，这里去除后缀查
            ||
            (props.bgmdesc[eachfile.name]||"").indexOf(searchword)!==-1
            ||
            (props.sounddesc[eachfile.name]||"").indexOf(searchword)!==-1
            ||
            (props.bcgdesc[eachfile.name]||"").indexOf(searchword)!==-1
            ||
            (props.coverdesc[eachfile.name]||"").indexOf(searchword)!==-1
            ){
              postlist[listind].push(eachfile)
            }
          }
          

          
        }
      }
    }else{
      postlist=prelist
    }
    setTimeout(()=>{
      setItems(buildItems({
        "bgm":postlist[0],
        "bcg":postlist[1],
        "cover":postlist[2],
        "sound":postlist[3],
        "spr":postlist[4],
      }))
    },500)

  }

  return (
    <div id="sourceground">
      <Search placeholder="搜索关键字(不区分大小写)" allowClear onSearch={onSearch} style={{ width: 300 }} />
      <Divider type='vertical' />
      <Button className="loadprojectbutton" type={needload?'primary':'slash'}><input type="file" multiple="" webkitdirectory="" name="file" accept='*' className="projectfile" onChange={(eve)=>{setNeedload(false);loadData(eve)}}></input>选择Data文件夹</Button>
      <Tabs defaultActiveKey='bgm' animated={false} 
      destroyInactiveTabPane={false}
      items={items} onChange={()=>{Howler.stop()}}/>
    </div>
  )
}

export default SourceGround