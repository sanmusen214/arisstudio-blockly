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
     * @param iscontinue 是否连续，true时不带断点，false时带断点
     */
    text=(name:string,group:string,text:string,iscontinue:boolean)=>{
        if(iscontinue){
            return `tc '${name}' '${group}' '${text}'`
        }else{
            return `t '${name}' '${group}' '${text}'`
        }
        
    }

    /**
     * 设置文本内容并高亮指定人物
     * @param iscontinue 是否连续，true时不带断点，false时带断点
     */
    texthighlight=(nameId:string,name:string,group:string,text:string,iscontinue:boolean)=>{
        if(iscontinue){
            return `thc ${nameId} '${name}' '${group}' '${text}'`
        }else{
            return `th ${nameId} '${name}' '${group}' '${text}'`
        }
        
    }

    /**
     * 文本框 设置文本内容
     * @param position middle:画面中间 bottom:底部
     * @param iscontinue 是否连续，true时不带断点，false时带断点
     * 
     */
     sidetext=(text:string,position:string,iscontinue:boolean)=>{
        if(position==="middle"){
            if(iscontinue){
                return `mtc '${text}'`
            }else{
                return `mt '${text}'`
            }
        }else{
            if(iscontinue){
                return `btc '${text}'`
            }else{
                return `bt '${text}'`
            }
        }
        
    }

    /**
     * 小标题
     */
    label=(text:string)=>{
        return `label '${text}'`
    }

    /**
     * 一行横幅
     */
    banner=(textmain:string)=>{
        return `banner '${textmain}'`
    }

    /**
     * 两行横幅
     */
    banner2=(textmain:string,textside:string)=>{
        return `banner '${textside}' '${textmain}'`
    }

    /**
     * 三行横幅
     */
    banner3=(textmain:string,textside:string,textside2:string)=>{
        return `banner '${textside}' '${textside2}' '${textmain}'`
    }
}
const myTexter=new Mytext();
export default myTexter;