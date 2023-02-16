import React from 'react'
import PlayGround, { Block, Value, Field, Shadow, Category } from '../../PlayGround';

function BackGroundMenu() {
  return (
    <Category name="舞台">
      <Category name="效果">
        <Block type="b_screen_set" />
        <Block type="b_screen_settime" />
      </Category>

      <Category name="背景">
        <Block type="b_bgpic_set"></Block>
        <Block type="b_bgpic_display"></Block>
        <Block type="b_bgpic_change"></Block>
        <Block type="b_bgpic_changesmoth"></Block>
      </Category>


      <Category name="覆盖图片">
        <Block type="b_bgpic_shake"></Block>
        <Block type="b_ftpic_set"></Block>
        <Block type="b_ftpic_display"></Block>
      </Category>


      <Category name="幕布">
        <Block type="b_curtain_display"></Block>
        <Block type="b_curtain_alpha"></Block>
        <Block type="b_curtain_color"></Block>
        <Block type="b_curtain_def_color"></Block>
      </Category>

      <Category name="结束/继续">
        <Block type="b_end_finish"></Block>
        <Block type="b_end_continue"></Block>
        <Block type="b_end_clear"></Block>
      </Category>
      
    </Category>
  )
}

export default BackGroundMenu