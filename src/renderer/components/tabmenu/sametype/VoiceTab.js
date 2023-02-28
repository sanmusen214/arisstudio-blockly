import React,{useEffect, useRef, useState} from 'react'
import { Pagination, Button } from 'antd'
import {
  CustomerServiceOutlined
} from '@ant-design/icons';
import { getBase64 } from 'renderer/utils/imagetool'
import {Howl,Howler} from 'howler'

/**
 * props.inputlist
 * props.style
 */
export default function VoiceTab(props) {
  const pagesize=49
  const [page,setPage]=useState(1)
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

  return (
    // 在props.style后追加会覆盖掉props.style
    <div style={props.style}>
      <Pagination simple current={page} onChange={(page)=>{setPage(page)}} pageSize={pagesize} total={Math.max(props.inputlist.length,1)} style={{textAlign:'center'}}/>
      <Button onClick={musicplay}>播放</Button><Button onClick={musicpause}>暂停</Button><Button onClick={musicback}>后退10s</Button><Button onClick={musicfront}>快进10s</Button>

      <div>
        <div style={{textAlign:'center'}}>
          {props.inputlist.slice((page-1)*pagesize,page*pagesize).map((eachfile)=>{
            return <span onClick={()=>{playmusic(eachfile)}} style={{display:'inline-block',width:'140px',height:'60px',cursor:'pointer',border:'1px solid gray',overflow:'hidden'}}><input value={eachfile.name}></input><CustomerServiceOutlined style={{fontSize:'30px'}}/></span>
          })}
        </div>
      </div>
    </div>
  )
}
