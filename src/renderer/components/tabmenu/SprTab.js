import React,{useEffect, useState} from 'react'
import {Col,Row } from 'antd'
import { getBase64,getText } from 'renderer/utils/imagetool'
import {spine} from "../../utils/spine-player"
import "../../utils/spine-player.css"
import "./SprTab.css"

export default function SprTab(props) {
  const [page,setPage]=useState(1)

  const sprmap=new Map() //所有文件名（有后缀）对照file
  const sprnameset=new Set() //所有文件名（无后缀）
  props.sprlist.forEach((each)=>{
    sprmap.set(each.name,each)
    sprnameset.add(each.name.split(".")[0])
  })
  const [nowname,setNowname]=useState("暂无选择")
  const [nowind,setNowind]=useState(-1)
  // 这一页的spr名
  const sprnamelist=[...sprnameset.values()]
  // console.log(sprnamelist)

  const renderspr=(eachname,elementid,nameind)=>{

    Promise.all([getBase64(sprmap.get(`${eachname}.skel`)),getText(sprmap.get(`${eachname}.atlas`)),getBase64(sprmap.get(`${eachname}.png`))]).then((reslist)=>{
      // 卸载以前的
      document.querySelector("#ba-player")?.remove()

      // 命名
      const skelname=`${eachname}.skel`
      const atlasname=`${eachname}.atlas`//这是个字符串
      const pngname=`${eachname}.png`

      console.log("3 names:",skelname,atlasname,pngname)
      // 文件内容
      const rawobj={}
      rawobj[skelname]=reslist[0]
      rawobj[atlasname]=reslist[1]
      rawobj[pngname]=reslist[2]
      // // 视口
      // const baviewport={
      //   x:-600,
      //   y:400,
      //   width: 1720,
      //   height: 1200,
      // }

      setNowname(eachname)
      setNowind(nameind)

      new spine.SpinePlayer(elementid,{
        skelUrl:skelname,
        atlasUrl:atlasname,
        rawDataURIs:rawobj,
        // viewport: baviewport,
        premultipliedAlpha: false,
        showControls: true,
        backgroundColor: "#cccccc", // set the walk animation to play once
      })
    }).catch(err=>console.log(err))
  }

  return (
    <>
    <div style={props.style}>
    <Row justify={'center'}><div style={{textAlign:'center'}}>{nowname}</div></Row>
    <Row>

      <Col span={6} style={props.style}>
        {sprnamelist.map((name,ind)=>{return <div className="stuname" onClick={()=>{
          renderspr(name,"basprbox",ind)
        }}>{name}</div>})}
      </Col>
      <Col span={18} style={{position:'relative'}}>
        <span id="basprbox" style={{position:'absolute',width:'100%',height:'100%'}}></span>
      </Col>
      

    </Row>

    </div>
    </>
  )
}
