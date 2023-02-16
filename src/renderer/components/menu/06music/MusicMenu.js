import React from 'react'
import PlayGround, { Block, Value, Field, Shadow, Category } from '../../PlayGround';

function MusicMenu() {
  return (
    <Category name="声音">
      <Block type="b_bgm_control">
      <Value name="val1"><Shadow type="text"></Shadow></Value>
      </Block>
      <Block type="b_bgm_pause" />
      <Block type="b_bgm_stop" />
      <Block type="b_bgm_volumn" />
    </Category>
  )
}

export default MusicMenu