import React from 'react'
import PlayGround, { Block, Value, Field, Shadow, Category } from '../../components/PlayGround';

export default function Menu06() {
  return (
    <Category name="按钮">
        <Block type="b_one_button">
          <Value name="val1">
            <Shadow type="text" />
          </Value>
        </Block>
        <Block type="b_two_button">
          <Value name="val1">
            <Shadow type="text" />
          </Value>
          <Value name="val2">
            <Shadow type="text" />
          </Value>
        </Block>
        <Block type="b_three_button">
          <Value name="val1">
            <Shadow type="text" />
          </Value>
          <Value name="val2">
            <Shadow type="text" />
          </Value>
          <Value name="val3">
            <Shadow type="text" />
          </Value>
        </Block>
    </Category>
  )
}
