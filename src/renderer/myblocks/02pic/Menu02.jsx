import PlayGround, { Block, Value, Field, Shadow, Category } from '../../components/PlayGround';

import React from 'react'

export default function Menu02() {
  return (
    <Category name="图片">
      <Block type="b_pic_display">
        <Value name="val1"><Shadow type="text" /></Value>
      </Block>
      <Block type="b_pic_alpha">
        <Value name="val1"><Shadow type="text" /></Value>
      </Block>
      <Block type="b_pic_move">
        <Value name="val1"><Shadow type="text" /></Value>
      </Block>
      hao
      <Block type="b_pic_movexy">
        <Value name="val1"><Shadow type="text" /></Value>
      </Block>
      <Block type="b_pic_shake">
        <Value name="val1"><Shadow type="text" /></Value>
      </Block>
      <Block type="b_pic_shakexy">
        <Value name="val1"><Shadow type="text" /></Value>
      </Block>
      <Block type="b_pic_scale">
        <Value name="val1"><Shadow type="text" /></Value>
      </Block>
    </Category>

  )
}
