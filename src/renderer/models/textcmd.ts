class Mytext{
    /**
     * 隐藏文本
     */
    hidetext=()=>{
        return `text hide`
    }

    /**
     * 设置打字机效果时间间隔
     */
    textinterval=(time:number)=>{
        return `text interval ${time}`
    }

    /**
     * 隐藏所有文本框
     */
    hidealltext=()=>{
        return `text hide`
    }

    /**
     * 设置文本内容
     * 本命令自带断点，即文本显示完毕后，会暂停并等待点击事件。
     */
    text=(text:string,name:string,group:string)=>{
        return `t ${name} ${group} ${text}`
    }

    /**
     * 设置文本内容并不带断点
     */
    textcontinue=(text:string,name:string,group:string)=>{
        return `tc ${name} ${group} ${text}`
    }

    /**
     * 设置文本内容并高亮指定人物
     * 本命令自带断点，即文本显示完毕后，会暂停并等待点击事件。
     */
    texthighlight=(nameId:string,name:string,group:string,text:string)=>{
        return `th ${nameId} ${name} ${group} ${text}}`
    }

    /**
     * 设置文本内容并高亮指定人物，不带断点
     */
    texthighlightcontinue=(nameId:string,name:string,group:string,text:string)=>{
        return `thc ${nameId} ${name} ${group} ${text}}`
    }

    /**
     * 中部文本框 设置文本内容 自带断点
     */
    textmiddle=(text:string)=>{
        return `mt ${text}`
    }

    /**
     * 中部文本框 设置文本内容并不带断点
     */
    textmiddlecontinue=(text:string)=>{
        return `mtc ${text}`
    }

    /**
     * 底部文本框 设置文本内容 自带断点
     */
    bottometext=(text:string)=>{
        return `bt ${text}`
    }

    /**
     * 底部文本框 设置文本内容并不带断点
     */
    bottomtextcontinue=(text:string)=>{
        return `btc ${text}`
    }

    /**
     * 小标题
     */
    label=(text:string)=>{
        return `label ${text}`
    }

    /**
     * 一行横幅
     */
    banner=(text:string)=>{
        return `banner ${text}`
    }

    /**
     * 两行横幅
     */
    banner2=(textmain:string,textside:string)=>{
        return `banner2 ${textside} ${textmain}`
    }

    /**
     * 三行横幅
     */
    banner3=(textmain:string,textside:string,textside2:string)=>{
        return `banner3 ${textside} ${textside2} ${textmain}`
    }
}
const myTexter=new Mytext();
export default myTexter;