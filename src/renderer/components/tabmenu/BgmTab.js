import React,{useEffect, useState} from 'react'
import { Input,Table,Tag,Tooltip, message,Row, Button } from 'antd'
import { QuestionCircleOutlined } from "@ant-design/icons"
import { findneededFile } from 'renderer/utils/DataTool.jsx'
import {Howl,Howler} from 'howler'
import { getBase64 } from 'renderer/utils/imagetool'
import copy from "copy-to-clipboard"


export default function BgmTab(props) {
  const soundlist=props.bgmlist
  
 const [bgmdesc,setBgmdesc]=useState(props.bgmdesc)
 useEffect(()=>{
    props.setBgmdesc(bgmdesc)
  },[bgmdesc])

  let musicplayer;

  const playmusic=(file)=>{
    getBase64(file).then((url)=>{
      musicplayer?.stop()
      Howler.stop()
      musicplayer=new Howl({src:url})
      musicplayer.play()
    })
  }

  useEffect(()=>{
    musicplayer?.stop()
  },[])
  
  const musicplay=()=>{
    Howler.stop()
    musicplayer?.play()
  }

  const musicpause=()=>{
    Howler.stop()
    musicplayer?.pause()
  }

  const musicback=()=>{
    if(musicplayer){
      musicplayer.seek(Math.max(musicplayer.seek()-10,0))
    }
  }

  const musicfront=()=>{
    if(musicplayer){
      musicplayer.seek(Math.min(musicplayer.seek()+10,musicplayer.duration()))
    }
  }


  const columns=[
      {
          title:"文件名",
          dataIndex:"name",
          width:"40%",
          render:(_,{name})=>{
              return <div onClick={()=>{
                  message.destroy()
                  message.success("复制成功")
                  copy(name)
              }}>{name}</div>
          }
      },
      {
          title:"备注",
          dataIndex:"name",
          render:(_,{name})=>{
              return <Input value={bgmdesc[name]||""} onChange={(e)=>{
                const newbgmdesc={...bgmdesc}
                newbgmdesc[name]=e.target.value
                setBgmdesc(newbgmdesc)
              }}/>
          }
      },
      {
          title:"操作",
          width:"20%",
          render:(_,record)=>{
              return (
              <>
              <Tag color="green" style={{cursor:"pointer"}} 
              onClick={()=>{
                playmusic(_)
              }}
              >播放</Tag>
              </>
              )
          }
      }
  ]
  const onSearch=(e)=>{
      const reslist=turnToRes(sounds_datamap,(sd)=>{return sd.desc.includes(e)})
      setSearchresult(reslist)
  }
  return (
      <div style={props.style}>
      <Row align={'middle'} justify={'center'}>
      <Button onClick={musicplay}>播放</Button><Button onClick={musicpause}>暂停</Button><Button onClick={musicback}>后退10s</Button><Button onClick={musicfront}>快进10s</Button> 如果你佩戴耳机，请适当减小系统音量
      </Row>
          
          <Table 
          columns={columns} 
          dataSource={props.bgmlist} 
          />
          
      </div>
  )




}
