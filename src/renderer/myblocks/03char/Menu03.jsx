import React from 'react'
import PlayGround, { Block, Value, Field, Shadow, Category } from '../../components/PlayGround';

export default function Menu03() {
  return (
    <Category name="人物">
      <Block type="b_char_display">
        <Value name="val1"><Shadow type="text" /></Value>
      </Block>
      <Block type="b_char_action">
        <Value name="val1"><Shadow type="text" /></Value>
      </Block>
      <Block type="b_char_highlight">
        <Value name="val1"><Shadow type="text" /></Value>
      </Block>
      <Block type="b_char_status">
        <Value name="val1"><Shadow type="text" /></Value>
        <Value name="val2"><Shadow type="text" /></Value>
        <Value name="val3"><Shadow type="text" /></Value>
        <Value name="val4"><Shadow type="text" /></Value>
      </Block>
      <Block type="b_char_move">
        <Value name="val1"><Shadow type="text" /></Value>
      </Block>
      <Block type="b_char_movexy">
        <Value name="val1"><Shadow type="text" /></Value>
      </Block>
      <Block type="b_char_shake">
        <Value name="val1"><Shadow type="text" /></Value>
      </Block>
      <Block type="b_char_shakexy">
        <Value name="val1"><Shadow type="text" /></Value>
      </Block>
      <Block type="b_char_scale">
        <Value name="val1"><Shadow type="text" /></Value>
      </Block>
    </Category>
  )
}
