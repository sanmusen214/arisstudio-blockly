import React from 'react'
import PlayGround, { Block, Value, Field, Shadow, Category } from '../components/PlayGround';

import Menu01 from './01load/Menu01';
import Menu02 from './02pic/Menu02';

import Menu04 from './04sound/Menu04';

import Menu06 from './06button/Menu06';


import Menu100 from './100define/Menu100';


export default function Toolbox() {
    return (
        <>
            <Menu01 />
            <Menu02 />

            <Menu04 />
            <Menu06 />
            <Category name="变量" custom="VARIABLE"></Category>
            <Category name="函数" custom="PROCEDURE"></Category>
            <Menu100 />
        </>
    )
}
