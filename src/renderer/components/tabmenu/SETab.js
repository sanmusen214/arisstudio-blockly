import React,{useState} from 'react'
import { sounds_datamap } from "../../datamap/index.js"
import { Input,Table,Tag,Tooltip, message,Row } from 'antd'
import { QuestionCircleOutlined } from "@ant-design/icons"
import { findneededFile } from 'renderer/utils/DataTool.jsx'
import {Howl,Howler} from 'howler'
import { getBase64 } from 'renderer/utils/imagetool'
import copy from "copy-to-clipboard"



const {Search}=Input


const turnToRes=(datamap,judge)=>{
    // 将datamap里的一对多转为一对一,对每个datamap元素判断judge
    const reslist=[]
        for(let sd of sounds_datamap){
            if(judge(sd)){
                for(let fn of sd.filenames){
                    reslist.push({
                        "filename":fn,
                        "desc":sd.desc
                    })
                }
            }
        }
        return reslist
}

const playmusic=(file)=>{
    getBase64(file).then((url)=>{
      Howler.stop()
      const musicplayer=new Howl({src:url})
      musicplayer.play()
    })
}

/**
 * props.soundlist
 * props.style
 */
export default function SETab(props) {
    const soundlist=props.soundlist
    const [searchresult,setSearchresult]=useState(turnToRes(sounds_datamap,()=>{return true}))

    
    const columns=[
        {
            title:"文件名",
            dataIndex:"filename",
            width:"40%",
            render:(_,{filename})=>{
                return <div onClick={()=>{
                    message.destroy()
                    message.success("复制成功")
                    copy(filename)
                }}>{filename}</div>
            }
        },
        {
            title:"描述",
            dataIndex:"desc"
        },
        {
            title:"操作",
            width:"20%",
            render:(_,record)=>{
                return (
                <>
                <Tag color="green" style={{cursor:"pointer"}} 
                onClick={()=>{
                    const thatfile=findneededFile(soundlist,record.filename)
                    if(thatfile){
                        playmusic(thatfile)
                    }else{
                        message.destroy()
                        message.error("未找到相关文件")
                    }
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
            <Search placeholder="搜索音效描述" allowClear onSearch={onSearch} style={{ width: 300,marginRight:"10px" }} />
            <Tooltip title={<div>欢迎各位使用【Aris Studio】全音效一览表，此文本已整理当前版本的【Aris Studio】的全部音效【共2092条】来方便各位在使用【Aris Studio】时更快速地寻找所需要音效，由于所有注释均为本人聆听所标注的，有些差异，如果有更好的注释请告知整理者。此外该表还有一些其他不足之处，也欢迎使用者提出改进建议。 整理：<a href='https://b23.tv/wfXw8Wq' target="_blank">传猫猫</a></div>}>
                <QuestionCircleOutlined style={{fontSize:20,opacity:0.5,verticalAlign:'middle'}}/>
            </Tooltip> 如果你佩戴耳机，请适当调小系统音量
        </Row>
            
            <Table 
            columns={columns} 
            dataSource={searchresult} 
            />
            
        </div>
    )
}
