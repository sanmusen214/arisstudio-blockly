import React,{useState} from 'react'
import { content } from 'renderer/datamap/se'
import { sounds_datamap } from "../../datamap/index.js"
import { Input,Table,Tag } from 'antd'

const {Search}=Input

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
            <Tag color="green">播放</Tag>
            </>
            )
        }
    }
]

export default function SETab() {
    const [searchresult,setSearchresult]=useState([])
    const onSearch=(e)=>{
        const reslist=[]
        for(let sd of sounds_datamap){
            if(sd.desc.includes(e)){
                for(let fn of sd.filenames){
                    reslist.push({
                        "filename":fn,
                        "desc":sd.desc
                    })
                }
            }
        }
        setSearchresult(reslist)
    }
    return (
        <>
            {/* <Search placeholder="搜索关键字(不区分大小写)" allowClear onSearch={onSearch} style={{ width: 300 }} />
            <Table 
            columns={columns} 
            dataSource={searchresult} 
            /> */}
            <br />
            <textarea rows={40} cols={170}>{content}</textarea>
        </>
    )
}
