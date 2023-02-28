import React from 'react'
import VoiceTab from './sametype/VoiceTab';

export default function BgmTab(props) {
  return <VoiceTab inputlist={props.bgmlist}  style={props.style}/>
}
