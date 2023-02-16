import React from 'react'
import PlayGround, { Block, Value, Field, Shadow, Category } from '../../PlayGround';

function SpecialMenu() {
  return (
    <Category name="特殊">
      <Block type="b_autotime" />
      <Block type="b_changetxt">
        <Value name="val1">
        <Shadow type="text"></Shadow>
        </Value>
      </Block>
      <Block type="b_comment">
        <Value name="val1">
        <Shadow type="text"></Shadow>
            </Value>
      </Block>
      <Block type="b_jump">
      <Value name="val1">
      <Shadow type="text"></Shadow>
            </Value>
      </Block>
      <Block type="b_target">
      <Value name="val1">
      <Shadow type="text"></Shadow>
            </Value>
      </Block>
      <Block type="b_waitclick" />
      <Block type="b_waittime" />
    </Category>
  )
}

export default SpecialMenu