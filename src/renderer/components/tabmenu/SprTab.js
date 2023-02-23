import React,{useEffect, useState} from 'react'
import { Image,Pagination,Button } from 'antd'
import { getBase64 } from 'renderer/utils/imagetool'
import {spine} from "../../utils/spine-player"
import "../../utils/spine-player.css"

export default function SprTab(props) {
  const pagesize=45
  const [page,setPage]=useState(1)

  const sprmap=new Map() //所有文件名（有后缀）对照file
  const sprnameset=new Set() //所有文件名（无后缀）
  props.sprlist.forEach((each)=>{
    sprmap.set(each.name,each)
    sprnameset.add(each.name.split(".")[0])
  })
  // 这一页的spr名
  const sprnamelist=[...sprnameset.values()].slice((page-1)*pagesize,page*pagesize)

  let spineobj

  const renderspr=(eachname)=>{

    Promise.all([getBase64(sprmap.get(`${eachname}.skel`)),getBase64(sprmap.get(`${eachname}.atlas`)),getBase64(sprmap.get(`${eachname}.png`))]).then((reslist)=>{
      console.log(reslist)
      const skelname=`${eachname}.skel`
      const atlasname=`${eachname}.atlas`
      const pngname=`${eachname}.png`

      new spine.SpinePlayer("baspinearea",{
        skelUrl:skelname,
        atlasUrl:atlasname,
        rawDataURIs:{
          skelname:reslist[0],
          atlasname:reslist[1],
          pngname:reslist[2]
        },
        premultipliedAlpha: false,
        showControls: true,
        backgroundColor: "#cccccc", // set the walk animation to play once
      })
    }).catch(err=>console.log(err))
  }

  return (
    <div>

    <Pagination simple current={page} onChange={(page)=>{setPage(page)}} pageSize={pagesize} total={Math.max(props.sprlist.length,1)} style={{textAlign:'center'}}/>
    <Button style={{visibility:'hidden'}}></Button>

    <div style={props.style}>
      <span style={{display:'inline-block',width:'30%'}}>
        {sprnamelist.map((eachname,ind)=>{return <div style={{cursor:'pointer'}} key={ind} onClick={()=>renderspr(eachname)}>{eachname}</div>})}
      </span>
      <span style={{display:'inline-block',width:'60%'}}>
        <div id="baspinearea" style={{width:'100%',height:'100%'}}>
            
        </div>
      </span>
    </div>

    </div>
  )
}
