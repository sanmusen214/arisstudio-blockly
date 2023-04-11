import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import PlayGround from './components/PlayGround';
import Toolbox from './components/Toolbox';
import { GlobalContext } from './config/globalContext';
// 引入的同时让所有自定义模块注入
import './myblocks'
import './utils/dialog'
import { ConfigProvider, theme } from 'antd';
import { useEffect, useState } from 'react';
import { useLocalStorage } from './hooks/useLocal';

function BlocklyArea() {
  return (
    <PlayGround
            readOnly={false}
            sounds={false}
            trashcan={true}
            maxBlocks="Infinity"
            zoom={{
              controls : false, 
              wheel : true, 
              startScale : 1.1, 
              maxScale : 1.5, 
              minScale : 0.2, 
              scaleSpeed : 1.1
            }}
            move={{
                scrollbars: true,
                drag: true,
                wheel: true
            }}
            // <block type="stage" x="0" y="0"></block>
            initialXml={`
<xml xmlns="http://www.w3.org/1999/xhtml">
</xml>
      `}
            >
            <Toolbox />
        </PlayGround>
  );
}

export default function App() {

  const [language,setLanguage]=useState("cn")
  const [darktheme,setDarktheme]=useLocalStorage("darktheme",false)
  
  const [mytheme,setMytheme]=useLocalStorage("mytheme",{
    algorithm:theme.defaultAlgorithm,
  })
  
  useEffect(()=>{
    if(!darktheme){
      setMytheme({
        algorithm:theme.defaultAlgorithm,
      })
    }else{
      setMytheme({
        algorithm:theme.darkAlgorithm,
      })
    }

  },[darktheme])

  return (
    <GlobalContext.Provider
    value={{
      language:language,
      darktheme:darktheme,
      setDarktheme:setDarktheme
    }}
    >
      <ConfigProvider
        theme={mytheme}
      >
        <Router>
          <Routes>
            <Route path="/" element={<BlocklyArea />} />
          </Routes>
        </Router>
      </ConfigProvider>
    </GlobalContext.Provider>
  );
}
