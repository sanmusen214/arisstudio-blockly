import React from 'react'
import PlayGround, { Block, Value, Field, Shadow, Category } from '../../components/PlayGround';

export default function Menu08() {
  return (
    <Category name="文字">
      <Block type="b_text_autotime">
      </Block>
      <Block type="b_text_hide">
      </Block>
      <Block type="b_text_txt">
        <Value name="val1"><Shadow type="text" /></Value>
        <Value name="val2"><Shadow type="text" /></Value>
        <Value name="val3"><Shadow type="text" /></Value>
      </Block>
      <Block type="b_text_highlight">
        <Value name="val1"><Shadow type="text" /></Value>
        <Value name="val2"><Shadow type="text" /></Value>
        <Value name="val3"><Shadow type="text" /></Value>
        <Value name="val4"><Shadow type="text" /></Value>
      </Block>
      <Block type="b_text_side">
        <Value name="val1"><Shadow type="text" /></Value>
      </Block>
      <Block type="b_text_label">
        <Value name="val1"><Shadow type="text" /></Value>
      </Block>
      <Block type="b_text_banner">
        <Value name="val1"><Shadow type="text" /></Value>
        <Value name="val2"><Shadow type="text" /></Value>
        <Value name="val3"><Shadow type="text" /></Value>
      </Block>
    </Category>
  )
}
