import React from 'react'
import PlayGround, { Block, Value, Field, Shadow, Category } from '../../PlayGround';

function BackGroundMenu() {
  return (
    <Category name="舞台">
      <Block type="b_screen_set" />
      <Block type="b_screen_settime" />

      <Block type="b_bgpic_set"></Block>
      <Block type="b_bgpic_display"></Block>
      <Block type="b_bgpic_change"></Block>
      <Block type="b_bgpic_changesmoth"></Block>


      <Block type="b_bgpic_shake"></Block>
      <Block type="b_ftpic_set"></Block>
      <Block type="b_ftpic_display"></Block>

    </Category>
  )
}

export default BackGroundMenu