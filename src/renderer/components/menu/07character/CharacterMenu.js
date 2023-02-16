import React from 'react'
import PlayGround, { Block, Value, Field, Shadow, Category } from '../../PlayGround';

function CharacterMenu() {
  return (
    <Category name="人物">
        <Block type="b_stu_display"></Block>
        <Block type="b_stu_position"></Block>
        <Block type="b_stu_action"></Block>
        <Block type="b_stu_face"></Block>
        <Block type="b_stu_emo"></Block>
        <Block type="b_stu_light"></Block>
        <Block type="b_stu_move"></Block>
    </Category>
  )
}

export default CharacterMenu