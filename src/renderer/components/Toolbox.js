import React from 'react'
import PlayGround, { Block, Value, Field, Shadow, Category } from './PlayGround';

import StudentSubMenu from './menu/01load/student/StudentSubMenu';

function Toolbox() {
    return (
        <>
            {/* 导入 */}
            <Category name="导入">
                <Block type="import" />
                {/* 导入学生 */}
                <StudentSubMenu />
            </Category>
            <Category name="动作">
            </Category>
            <Category name="变量">
                <Block type="string" />
            </Category>

            <Category name="逻辑块">
                <Block type="stage" />
                <Block type="controls_if" />
                <Block type="controls_ifelse" />
                <Block type="controls_repeat_ext">
                    <Value name="TIMES">
                        <Shadow type="math_number">
                            <Field name="NUM">3</Field>
                        </Shadow>
                    </Value>
                </Block>
            </Category>
        </>
    )
}

export default Toolbox