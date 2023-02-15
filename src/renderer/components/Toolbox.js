import React from 'react'
import PlayGround, { Block, Value, Field, Shadow, Category } from './PlayGround';

import StudentSubMenu from './menu/01load/StudentSubMenu';

import MyDefineSubMenu from './menu/100define/MyDefineSubMenu'

function Toolbox() {
    return (
        <>
            {/* 导入 */}
            <Category name="导入">
                <Block type="b_load" />
                {/* 导入学生 */}
                <StudentSubMenu />
            </Category>
            {/* 其他 */}
            <MyDefineSubMenu />
            <Category name="变量" custom="VARIABLE"></Category>
        </>
    )
}

export default Toolbox