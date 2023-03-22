import React,{useEffect, useRef, useState} from 'react'
import {Col,Pagination,Row,Switch } from 'antd'
import { getBase64,getText } from 'renderer/utils/imagetool'
import {spine,hullpos,animationlist} from "../../utils/spine-player"
import "../../utils/spine-player.css"
import "./SprTab.css"

var myTout

const clearSprspace=()=>{
  /**
   * 清除spr区域
   */
  while(document.querySelector("#ba-player")){
    document.querySelector("#ba-player").remove()
  }
  for(let i=0;i<9;i++){
    document.querySelector("#namechafen"+i).innerHTML=""
  }
}

export default function SprTab(props) {
  // 差分的分页
  const [page,setPage]=useState(1)
  const [chafenlistlen,setChafenlistlen]=useState(1)

  const sprmap=new Map() //所有文件名（有后缀）对照file
  const sprnameset=new Set() //所有文件名（无后缀）
  props.sprlist.forEach((each)=>{
    sprmap.set(each.name,each)
    sprnameset.add(each.name.split(".")[0])
  })
  const [nowname,setNowname]=useState("暂无选择")
  const [nowind,setNowind]=useState(-1)
  const [chafen,setChafen]=useState(false)
  const chafenRef=useRef(chafen)
  chafenRef.current=chafen

  // 这一页的spr名
  const sprnamelist=[...sprnameset.values()]
  // console.log(sprnamelist)

  const renderspr=(eachname,elementid,nameind,page=-1)=>{

    Promise.all([getBase64(sprmap.get(`${eachname}.skel`)),getText(sprmap.get(`${eachname}.atlas`)),getBase64(sprmap.get(`${eachname}.png`))]).then((reslist)=>{

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

      if(page!==-1){
        // 如果只是翻页，跳过先渲染一次获取表情的这个过程

      }else{
        // 卸载以前的
        clearSprspace()

        setNowname(eachname)
        setNowind(nameind)

        new spine.SpinePlayer(elementid,{
          skelUrl:skelname,
          atlasUrl:atlasname,
          rawDataURIs:rawobj,
          premultipliedAlpha: false,
          showControls: true,
          debug:{
            hulls:chafenRef.current
          },
          backgroundColor: "#cccccc", // set the walk animation to play once
        })
      }
      
      clearTimeout(myTout)
      // 如果开启差分
      if(chafenRef.current){

        myTout=setTimeout(()=>{
          console.log("定时器Sprtab")
          // 第一次渲染得到面部位置和animation列表
          let xlist=hullpos.map((each)=>{return each[0]})
          let ylist=hullpos.map((each)=>{return each[1]})
          console.log(hullpos)
          // console.log(Math.min(...xlist),Math.max(...xlist))
          // console.log(Math.min(...ylist),Math.max(...ylist))
          console.log(animationlist)

          const viewpad=50
          const baviewport={
            x:Math.min(...xlist)-viewpad,
            y:Math.min(...ylist)-viewpad,
            width: Math.max(...xlist)-Math.min(...xlist)+2*viewpad,
            height: Math.max(...ylist)-Math.min(...ylist)+2*viewpad,
          }

          console.log("视口",baviewport)
          
          
          // 

          // 
          clearSprspace()
          // 循环渲染面部
          let mypage=page
          if(mypage===-1){
            mypage=1
          }
          setPage(mypage)
          new Promise((resolve,reject)=>{
            setChafenlistlen(animationlist.length)
            animationlist.forEach((each,ind)=>{
              if(ind>=9*(mypage-1) && ind<9*mypage){
                document.querySelector("#namechafen"+ind%9).innerHTML=each.name
                new spine.SpinePlayer(elementid+"chafen"+ind%9,{
                  paused:true,
                  skelUrl:skelname,
                  atlasUrl:atlasname,
                  rawDataURIs:rawobj,
                  animation:each.name,
                  viewport: {...baviewport},// 定位到脸
                  premultipliedAlpha: false,
                  showControls: true,
                  backgroundColor: "#cccccc", // set the walk animation to play once
                })
              }
              
            })
          })
        },page!==-1?200:500)    
        }
      }).catch(err=>console.log(err))
  }

  return (
    <>
    <div>
    <Row justify={'center'}>
      <div style={{textAlign:'center',marginRight:'15px'}}>{nowname}</div>
      面部差分：<Switch checked={chafen} onClick={(ck)=>{
        setChafen((ck)=>{
          renderspr(nowname,"basprbox",nowind)
          return !ck
        })
        }}></Switch>
    </Row>
    <Row justify={'center'}>
      <Pagination total={chafenlistlen} current={page} pageSize={9} onChange={(newpage)=>{
        renderspr(nowname,"basprbox",nowind,newpage)
        
        }}/>
    </Row>
    <Row>

      <Col span={6} style={props.style}>
        {sprnamelist.map((name,ind)=>{return <div className="stuname" style={{backgroundColor:ind===nowind?'lightblue':""}} onClick={()=>{
          renderspr(name,"basprbox",ind,-1)
        }}>{name}</div>})}
      </Col>
      <Col span={18} style={{position:'relative'}}>
          <span id="basprbox" style={{position:'absolute',display:'inline-block',width:'100%',height:'100%'}}></span>
          {[0,0,0,0,0,0,0,0,0].map((each,ind)=>{
            return (<div style={{display:chafen?'inline-block':'none',width:'200px',height:"220px"}}>
              <span id={"namechafen"+ind} style={{display:chafen?'inline-block':'none',width:'200px',height:'10px'}}></span>
              <span id={"basprboxchafen"+ind} style={{display:chafen?'inline-block':'none',width:'200px',height:'200px'}}></span>
            </div>)
          })}
        
      </Col>
      
    </Row>

    </div>
    </>
  )
}
