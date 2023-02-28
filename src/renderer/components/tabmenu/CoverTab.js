import React from 'react'
import ImageTab from './sametype/ImageTab'

export default function CoverTab(props) {
  return <ImageTab inputlist={props.coverlist} imgshape={"square"}  style={props.style}/>
}
