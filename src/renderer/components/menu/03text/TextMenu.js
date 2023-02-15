import React from 'react'
import PlayGround, { Block, Value, Field, Shadow, Category } from '../../PlayGround';

function TextMenu() {
  return (
    <Category name="文字">
      <Block type="b_text_set"></Block>
      <Block type="b_text_hl"></Block>
      <Block type="b_text_hide"></Block>
      <Block type="b_text_size"></Block>
      <Block type="b_text_interval"></Block>
    </Category>
  )
}

export default TextMenu