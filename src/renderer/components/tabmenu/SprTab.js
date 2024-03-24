import React,{useEffect, useRef, useState} from 'react'
import {Checkbox, Col,Divider,Pagination,Row,Switch, message, Input } from 'antd'
import { getBase64,getText } from 'renderer/utils/imagetool'
import {spine,hullpos,animationlist} from "../../utils/spine-player"
import { useLocalStorage } from 'renderer/hooks/useLocal'
import "../../utils/spine-player.css"
import "./SprTab.css"
import copy from "copy-to-clipboard"
import { getcnnameof } from 'renderer/datamap'


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

// 防抖
function antiShake(fun, delay) {
  window.sprantiflag = null;
  return function (e) {
      clearTimeout(window.sprantiflag);
      window.sprantiflag = setTimeout(() => {
          fun.apply(this, arguments);
      }, delay)
  };
}

export default function SprTab(props) {
  // console.log("SprTab", props.sprdesc)
  // 差分的分页
  const [page,setPage]=useState(1)
  const [chafenlistlen,setChafenlistlen]=useState(1)
  // 部分人物的各自设置：置顶与否attop,
  const [charsettings,setCharsettings]=useLocalStorage("charsettings",{})

  const sprmap=new Map() //所有文件名（有后缀）对照file
  const sprnameset=new Set() //所有文件名（无后缀）
  props.sprlist.forEach((each)=>{
    sprmap.set(each.name,each)
    sprnameset.add(each.name.split(".")[0])
  })
  const [nowname,setNowname]=useState("暂无选择")
  const [nowind,setNowind]=useState(-1)
  const [chafen,setChafen]=useState(false)//差分与否
  // const [fixpos,setFixpos]=useState(false)//固定视角与否
  const chafenRef=useRef(chafen)
  chafenRef.current=chafen

  // 显示的的spr名
  const sprnamelist=[...sprnameset.values()]
  // console.log(sprnamelist)

  // 置顶按钮的值
  const [buttonontopcheck,setButtontopcheck]=useState(false)

  // 差分视口是否智能/固定
  const [smartwin,setSmartwin]=useState(false)
  // 获取current当下对象值
  const smartRef=useRef(smartwin)
  smartRef.current=smartwin
  // 用户对某个spr的备注
  const [sprdesc, setSprdesc] = useState(props.sprdesc)

  useEffect(()=>{
    props.setSprdesc(sprdesc)
  },[sprdesc])

  useEffect(()=>{
    setButtontopcheck(charsettings[nowname]?true:false)
  },[nowname])

  const findDescOfNownName=()=>{
    return sprdesc[nowname]||""
  }


  const renderspr=(eachname,elementid,nameind,page=-1)=>{

    Promise.all([getBase64(sprmap.get(`${eachname}.skel`)),getText(sprmap.get(`${eachname}.atlas`)),getBase64(sprmap.get(`${eachname}.png`))]).then((reslist)=>{

      // 命名
      const skelname=`${eachname}.skel`
      const atlasname=`${eachname}.atlas`//这是个字符串
      const pngname=`${eachname}.png`

      // console.log("3 names:",skelname,atlasname,pngname)
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
          // console.log("定时器Sprtab")
          // 第一次渲染得到面部位置和animation列表
          let xlist=hullpos.map((each)=>{return each[0]})
          let ylist=hullpos.map((each)=>{return each[1]})
          // console.log(hullpos)
          // console.log(Math.min(...xlist),Math.max(...xlist))
          // console.log(Math.min(...ylist),Math.max(...ylist))
          // console.log(animationlist)

          const viewpad=50
          let baviewport;
          if(smartRef.current){
            baviewport={
            x:Math.min(...xlist)-viewpad,
            y:Math.min(...ylist)-viewpad,
            width: Math.max(...xlist)-Math.min(...xlist)+2*viewpad,
            height: Math.max(...ylist)-Math.min(...ylist)+2*viewpad,
          }
          }else{
            // 每个人物都固定视角
          baviewport={
            x:-230,
            y:776,
            width: 454,
            height: 454,
          }
          }
          
          

          // console.log("视口",baviewport)
          
          
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
                const spineA=new spine.SpinePlayer(elementid+"chafen"+ind%9,{
                  skelUrl:skelname,
                  atlasUrl:atlasname,
                  rawDataURIs:rawobj,
                  animation:each.name,
                  viewport: {...baviewport},// 定位到脸
                  premultipliedAlpha: false,
                  showControls: false,
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
    <Row justify={'center'} align={'middle'}>
      <div style={{textAlign:'center',marginRight:'15px'}}
      onClick={()=>{
        message.destroy()
        message.success("复制成功")
        copy(nowname)
      }}>{nowname}</div>

      
      置顶：<Checkbox checked={buttonontopcheck} onChange={(key)=>{
        const ck=key.target.checked
        setButtontopcheck(ck)
        const newcharsettings={...charsettings}
        newcharsettings[nowname]=ck
        if(!ck){//如果改为false，直接把键给删了
          delete newcharsettings[nowname]
        }
        setCharsettings(newcharsettings)
      }}></Checkbox>

      面部差分：<Switch checked={chafen} onClick={(ck)=>{
        setChafen((ck)=>{
          renderspr(nowname,"basprbox",nowind)
          return !ck
        })
        }}></Switch>

      <span style={chafen?{}:{visibility:'hidden'}}>{smartwin?"差分识别脸部":"差分固定位置"}<Switch checked={smartwin} onClick={(ck)=>{
        setSmartwin(ck)
        renderspr(nowname,"basprbox",nowind)
      }}></Switch></span>
      
      <span style={{width: "250px"}}>
        {/* antd的输入框Input组件 */}
        <Input placeholder="此人物的备注" value={findDescOfNownName(nowname)} 
        style={{width:'100%',marginLeft:'15px'}}
        onChange={(e)=>{
          const newdesc={...sprdesc}
          newdesc[nowname]=e.target.value
          setSprdesc(newdesc)
        }
        }/>
        
      </span>

    </Row>
    <Row justify={'center'}>
      <Pagination total={chafenlistlen} current={page} pageSize={9} onChange={(newpage)=>{
        renderspr(nowname,"basprbox",nowind,newpage)
        }}/>
    </Row>
    <Row>
      
      {/* 左侧列表 */}
      <Col span={6} style={props.style}>
        {/* 置顶的列表 */}
        {Object.keys(charsettings).map((name,ind)=>{
          if(sprnamelist.includes(name)){
            return <div className="stuname" style={{backgroundColor:ind+5000===nowind?'lightblue':""}} //ind+5000与后面错开
            onClick={()=>{
              renderspr(name,"basprbox",ind+5000,-1)
            }}>{name+getcnnameof(name)+" "+(sprdesc[name]||"").split(" ")[0]}</div>
          }
          return <></>
          })}
        <Divider />
        {/* 所有人物的列表 */}
        {sprnamelist.map((name,ind)=>{return <div className="stuname" style={{backgroundColor:ind===nowind?'lightblue':""}} 
        onClick={()=>{
          renderspr(name,"basprbox",ind,-1)
        }}>{name+getcnnameof(name)+" "+(sprdesc[name]||"").split(" ")[0]}</div>})}
      </Col>
      {/* 右侧预览 */}
      <Col span={18} style={{position:'relative'}}>
          <span id="basprbox" style={{position:'absolute',display:'inline-block',width:'100%',height:'100%'}}></span>
          {[0,0,0,0,0,0,0,0,0].map((each,ind)=>{
            return (<div 
              style={{display:chafen?'inline-block':'none',width:'200px',height:"220px"}}
            onClick={(e)=>{
              message.destroy()
              message.success("复制成功")
              copy(e.target.parentNode.parentNode.parentNode.innerText)
              }}>
              <span id={"namechafen"+ind} style={{display:chafen?'inline-block':'none',width:'200px',height:'20px',zIndex:999}}></span>
              <span id={"basprboxchafen"+ind} style={{display:chafen?'inline-block':'none',width:'200px',height:'200px'}}></span>
            </div>)
          })}
        
      </Col>
      
    </Row>

    </div>
    </>
  )
}
