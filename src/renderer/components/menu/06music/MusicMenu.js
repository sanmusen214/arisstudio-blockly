import React from 'react'
import PlayGround, { Block, Value, Field, Shadow, Category } from '../../PlayGround';

function MusicMenu() {
  return (
    <Category name="声音">
      <Block type="b_bgm_control" />
      <Block type="b_bgm_pause" />
      <Block type="b_bgm_stop" />
      <Block type="b_bgm_volumn" />
    </Category>
  )
}

export default MusicMenu