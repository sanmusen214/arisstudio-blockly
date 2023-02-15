import React from 'react'
import PlayGround, { Block, Value, Field, Shadow, Category } from './PlayGround';

import LoadMenu from './menu/01load/LoadMenu';
import SpecialMenu from './menu/02special/SpecialMenu';
import TextMenu from './menu/03text/TextMenu';
import ButtonMenu from './menu/04button/ButtonMenu';
import BckMenu from './menu/05bcg/BackGroundMenu';
import MusicMenu from './menu/06music/MusicMenu';
import CharacterMenu from './menu/07character/CharacterMenu';
import MyDefineMenu from './menu/100define/MyDefineMenu'

function Toolbox() {
    return (
        <>
            <LoadMenu />
            <SpecialMenu />
            <TextMenu />
            <ButtonMenu />
            <BckMenu />
            <MusicMenu />
            <CharacterMenu />
            <Category name="变量" custom="VARIABLE"></Category>
            <MyDefineMenu />
        </>
    )
}

export default Toolbox