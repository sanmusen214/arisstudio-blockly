import React from 'react'
import PlayGround, { Block, Value, Field, Shadow, Category } from '../../PlayGround';

function SpecialMenu() {
  return (
    <Category name="特殊">
      <Block type="b_autotime" />
      <Block type="b_changetxt" />
      <Block type="b_comment" />
      <Block type="b_jump" />
      <Block type="b_target" />
      <Block type="b_waitclick" />
      <Block type="b_waittime" />
    </Category>
  )
}

export default SpecialMenu