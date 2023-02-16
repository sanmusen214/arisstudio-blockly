import React from 'react'
import PlayGround, { Block, Value, Field, Shadow, Category } from '../../PlayGround';

function BackGroundMenu() {
  return (
    <Category name="舞台">
      <Block type="b_screen_set" />
      <Block type="b_screen_settime" />
    </Category>
  )
}

export default BackGroundMenu