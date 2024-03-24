import React,{useEffect, useState} from 'react'
import { Image,Pagination,Button,Typography, message } from 'antd'
import { getBase64 } from 'renderer/utils/imagetool'
import copy from "copy-to-clipboard"

const {Text}=Typography

/**
 * inputlist, 
 * imgshape: 'square'
 * style
 * filedesc
 * setFiledesc
 */
export default function ImageTab(props) {

    const pagesize=Math.min(45,props.inputlist.length)
    const [page,setPage]=useState(1)
    // 图片data url
    let [srclist,setSrclist]=useState(new Array(pagesize))
    // 图片名字
    let [namelist,setNamelist]=useState(new Array(pagesize))
    const imgshape=props.imgshape
    // 该组件的用于render，传递给父组件用于更新localStorage
    const [filedesc,setFiledesc]=useState(props.filedesc)
    useEffect(()=>{
      props.setFiledesc(filedesc)
    },[filedesc])

    const changeDesc=(name, desc)=>{
      // console.log(name)
      // console.log(desc)
      const copydesc={...filedesc}
      copydesc[name]=desc
      setFiledesc(copydesc)
    }
  
    useEffect(()=>{
      // 先用error代替
      const errorarray=new Array(pagesize)
      errorarray.fill("")
      setSrclist(errorarray)
      const errornamearray=new Array(pagesize)
      errornamearray.fill("加载中")
      setNamelist(errornamearray)
  
      // 异步逐个加载
      props.inputlist.slice((page-1)*pagesize,page*pagesize).forEach((file,ind)=>{
        getBase64(file).then((srcurl)=>{
          const copysrclist=srclist
          copysrclist[ind]=srcurl
          setSrclist(copysrclist)
          const copynamelist=namelist
          copynamelist[ind]=file.name
          setNamelist(copynamelist)
        })
      })
    },[page,pagesize,props.inputlist])
  
    return (
      // 在props.style后追加会覆盖掉props.style
      <div style={props.style}>
        <Pagination simple current={page} onChange={(page)=>{setPage(page)}} pageSize={pagesize} total={Math.max(props.inputlist.length,1)} style={{textAlign:'center'}}/>
        <Button style={{visibility:'hidden'}}></Button>
  
        <div>
          <div style={{textAlign:'center'}}>
          <Image.PreviewGroup>
            {srclist.map((each,ind)=>{
              return <span style={{position:'relative',display:'inline-block',width:'140px',height:'120px',overflow:'hidden'}}>
                <div>{imgshape==="square"?<Image width={80} height={80} src={each}></Image>:<Image width={140} height={80} src={each}></Image>}</div>
                <div style={{overflow:"hidden",height:"20px"}}>
                  <Text keyboard onClick={()=>{
                    copy(namelist[ind])
                    message.destroy()
                    message.success("复制成功")
                  }}>{namelist[ind]}</Text>
                </div>
                <div style={{overflow:"hidden",height:"20px"}}>
                  <Text keyborad editable={{onChange: (val)=>{changeDesc(namelist[ind], val)}}}>
                    {filedesc[namelist[ind]]===undefined?"":filedesc[namelist[ind]]}
                  </Text>
                </div>
                </span>
            })}
          </Image.PreviewGroup>
          </div>
        </div>
      </div>
    )
}
