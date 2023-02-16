import React from 'react'
import PlayGround, { Block, Value, Field, Shadow, Category } from '../../PlayGround';

function TextMenu() {
  return (
    <Category name="文字">
      <Block type="b_banner_both"></Block>
      <Block type="b_banner_main"></Block>
      <Block type="b_label_title"></Block>
      <Block type="b_text_set"></Block>
      <Block type="b_text_hl"></Block>
      <Block type="b_text_hide"></Block>
      <Block type="b_text_size"></Block>
      <Block type="b_text_interval"></Block>
      <Block type="b_text_setfont"></Block>
    </Category>
  )
}

export default TextMenu