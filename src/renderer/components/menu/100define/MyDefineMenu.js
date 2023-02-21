import React from 'react'
import PlayGround, { Block, Value, Field, Shadow, Category } from '../../PlayGround';

function MyDefineMenu() {
  return (
    <Category name="其他块">
        <Block type="b_stage" />

        <Block type="b_case" />
        <Block type="b_case_jump" />
        <Block type="b_user_write">
            <Value name="val1">
                <Shadow type="text">
                </Shadow>
            </Value>
        </Block>
        <Block type="text" />
        {/* <Block type="controls_repeat_ext">
            <Value name="TIMES">
                <Shadow type="math_number">
                    <Field name="NUM">3</Field>
                </Shadow>
            </Value>
        </Block> */}


    </Category>
  )
}

export default MyDefineMenu