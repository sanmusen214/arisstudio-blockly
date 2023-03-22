import React,{useState} from 'react'
import { sounds_datamap } from "../../datamap/index.js"
import { Input,Table,Tag,Tooltip, message } from 'antd'
import { QuestionCircleOutlined } from "@ant-design/icons"
import { findneededFile } from 'renderer/utils/DataTool.jsx'
import {Howl,Howler} from 'howler'
import { getBase64 } from 'renderer/utils/imagetool'


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
                return filename
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
        <div style={{textAlign:'center'}}>
            <Search placeholder="搜索音效描述" allowClear onSearch={onSearch} style={{ width: 300,marginRight:"10px" }} />
            <Tooltip title="此文本收集整合了ArisStudio目前的所有音效，以方便各位在使用AS创作时更快捷地寻找对应音效。 添加了中文注解以及分类，所有音效均为本人聆听后进行整合，可能会出现误差，各位如果在使用过程中发现问题请及时说明，此外所有音效均为音效文件夹初始代码，使用时直接复制粘贴即可。 整合人：传">
                <QuestionCircleOutlined style={{fontSize:20,opacity:0.5,verticalAlign:'middle'}}/>
            </Tooltip>
        </div>
            
            <Table 
            columns={columns} 
            dataSource={searchresult} 
            />
            
        </div>
    )
}
