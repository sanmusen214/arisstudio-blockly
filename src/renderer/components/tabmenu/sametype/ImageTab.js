import React,{useEffect, useState} from 'react'
import { Image,Pagination,Button } from 'antd'
import { getBase64 } from 'renderer/utils/imagetool'

/**
 * inputlist
 */
export default function ImageTab(props) {

    const pagesize=45
    const [page,setPage]=useState(1)
    // 图片data url
    let [srclist,setSrclist]=useState(new Array(pagesize))
    // 图片名字
    let [namelist,setNamelist]=useState(new Array(pagesize))
  
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
      <div>
        <Pagination simple current={page} onChange={(page)=>{setPage(page)}} pageSize={pagesize} total={Math.max(props.inputlist.length,1)} style={{textAlign:'center'}}/>
        <Button style={{visibility:'hidden'}}></Button>
  
        <div style={props.style}>
          <div style={{textAlign:'center'}}>
          <Image.PreviewGroup>
            {srclist.map((each,ind)=>{
              return <span style={{position:'relative',display:'inline-block',width:'140px',height:'100px',overflow:'hidden'}}>
                <div><Image width={140} height={80} src={each}></Image></div>
                <input disabled value={namelist[ind]}></input>
                </span>
            })}
          </Image.PreviewGroup>
          </div>
        </div>
      </div>
    )
}
