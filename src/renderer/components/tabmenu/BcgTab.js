import React from 'react'
import ImageTab from './sametype/ImageTab'

export default function BcgTab(props) {
  return <ImageTab inputlist={props.bcglist} style={props.style} filedesc={props.bcgdesc} setFiledesc={props.setBcgdesc}/>
}
