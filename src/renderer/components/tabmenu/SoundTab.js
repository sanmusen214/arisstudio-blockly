import React from 'react'
import VoiceTab from './sametype/VoiceTab'

export default function SoundTab(props) {
  return <VoiceTab inputlist={props.soundlist} style={props.style} />
}
