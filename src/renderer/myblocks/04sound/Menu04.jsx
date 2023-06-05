import React from 'react'
import PlayGround, { Block, Value, Field, Shadow, Category } from '../../components/PlayGround';

export default function Menu04() {
  return (
    <Category name="声音">
      <Block type="b_sound_play">
        <Value name="val1"><Shadow type="text" /></Value>
      </Block>
      <Block type="b_sound_volume">
        <Value name="val1"><Shadow type="text" /></Value>
      </Block>
      <Block type="b_sound_loop">
        <Value name="val1"><Shadow type="text" /></Value>
      </Block>
    </Category>
  )
}
