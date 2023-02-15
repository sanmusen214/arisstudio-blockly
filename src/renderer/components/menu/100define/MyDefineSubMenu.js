import React from 'react'
import PlayGround, { Block, Value, Field, Shadow, Category } from '../../PlayGround';

function MyDefineSubMenu() {
  return (
    <Category name="其他块">
        <Block type="b_stage" />
        <Block type="controls_repeat_ext">
            <Value name="TIMES">
                <Shadow type="math_number">
                    <Field name="NUM">3</Field>
                </Shadow>
            </Value>
        </Block>
        <Block type="text" />

    </Category>
  )
}

export default MyDefineSubMenu