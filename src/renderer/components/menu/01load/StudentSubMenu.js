import React from 'react'
import PlayGround, { Block, Value, Field, Shadow, Category } from '../../PlayGround';

function StudentSubMenu() {
  return (
    <Category name="学生">
        <Block type="b_student">
            <Value name="val1">
                <Block type="text"></Block>
            </Value>
        </Block>
        <Block type="b_def_student">
            <Value name="val1">
                <Block type="text"></Block>
            </Value>
            <Value name="val2">
                <Block type="text"></Block>
            </Value>
        </Block>
        <Block type="b_other">
            <Value name="val1">
                <Block type="text"></Block>
            </Value>
            <Value name="val2">
                <Block type="text"></Block>
            </Value>
        </Block>
    </Category>
  )
}

export default StudentSubMenu