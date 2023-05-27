import React from 'react'
import PlayGround, { Block, Value, Field, Shadow, Category } from '../../PlayGround';

function LoadMenu() {
  return (
    <Category name="加载">
        <Block type="b_load" />
        <Block type="b_student">
            <Value name="val1">
          <Shadow type="text"></Shadow>
          </Value>
        </Block>
        <Block type="b_def_student">
            <Value name="val1">
            <Shadow type="text"></Shadow>
            </Value>
            <Value name="val2">
            <Shadow type="text"></Shadow>
            </Value>
        </Block>
        <Block type="b_load_custom">
            <Value name="val1">
            <Shadow type="text"></Shadow>
            </Value>
            <Value name="val2">
            <Shadow type="text"></Shadow>
            </Value>
            <Value name="val3">
            <Shadow type="text"></Shadow>
            </Value>
            <Value name="val4">
            <Shadow type="text"></Shadow>
            </Value>
        </Block>
        <Block type="b_load_char">
            <Value name="val1">
            <Shadow type="text"></Shadow>
            </Value>
            <Value name="val2">
            <Shadow type="text"></Shadow>
            </Value>
            <Value name="val3">
            <Shadow type="text"></Shadow>
            </Value>
        </Block>
        <Block type="b_load_other">
            <Value name="val1">
            <Shadow type="text"></Shadow>
            </Value>
            <Value name="val2">
            <Shadow type="text"></Shadow>
            </Value>
        </Block>
    </Category>
  )
}

export default LoadMenu