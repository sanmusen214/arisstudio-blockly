import React from 'react'
import PlayGround, { Block, Value, Field, Shadow, Category } from '../../PlayGround';

function CharacterMenu() {
  return (
    <Category name="人物">
        <Block type="b_stu_display">
        <Value name="val1"><Shadow type="text"></Shadow></Value>
        </Block>
        <Block type="b_stu_position">
        <Value name="val1"><Shadow type="text"></Shadow></Value>
        </Block>
        <Block type="b_stu_action">
        <Value name="val1"><Shadow type="text"></Shadow></Value>
        </Block>
        <Block type="b_stu_face">
        <Value name="val1"><Shadow type="text"></Shadow></Value>
        <Value name="val2"><Shadow type="text"></Shadow></Value>
        </Block>
        <Block type="b_stu_emo">
        <Value name="val1"><Shadow type="text"></Shadow></Value>
        </Block>
        <Block type="b_stu_emoinit">
        <Value name="val1"><Shadow type="text"></Shadow></Value>
        </Block>
        <Block type="b_stu_light">
        <Value name="val1"><Shadow type="text"></Shadow></Value>
        </Block>
        <Block type="b_stu_move">
        <Value name="val1"><Shadow type="text"></Shadow></Value>
        </Block>
        <Block type="b_stu_cover">
        <Value name="val1"><Shadow type="text"></Shadow></Value>
        </Block>
        <Block type="b_stu_shake">
        <Value name="val1"><Shadow type="text"></Shadow></Value>
        </Block>
        <Block type="b_stu_stopshake">
        <Value name="val1"><Shadow type="text"></Shadow></Value>
        </Block>
    </Category>
  )
}

export default CharacterMenu