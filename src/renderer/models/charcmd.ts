class myChar{
    /**
     * 带有渐变高亮的 显示/隐藏
     */
    show=(nameId:string,type:string)=>{
        return `${nameId} ${type}`
    }


    /**
     * 直接出现/消失
     */
    appear=(nameId:string,type:string)=>{
        return `${nameId} ${type}`
    }

    /**
     * 高亮
     */
    highlight=(nameId:string,hl,time=0)=>{
        return `${nameId} hl ${hl} ${time}`
    }

    /**
     * 透明度变化
     */

    /**
     * 状态
     */
    state=(nameId:string,state:string)=>{
        return `${nameId} state ${state}`
    }

    /**
     * 皮肤
     */
    skin=(nameId:string,skin:string)=>{
        return `${nameId} skin ${skin}`
    }

    /**
     * 设置角色动画
     */

    /**
     * x，y位置
     */
    posxy=(nameId:string,x:number,y:number)=>{
        return `${nameId} pos ${x} ${y}`
    }

    /**
     * 单独设x，y，z位置
     * @param pos "x"/"y"/"z"
     */
    pos=(nameId:string,pos:string,value:number)=>{
        return `${nameId} ${pos} ${value}`
    }

    /**
     * 在 x 和 y 轴移动
     */
    movexy=(nameId:string,x:number,y:number,time:number)=>{
        return `${nameId} pm ${x} ${y} ${time}`
    }

    /**
     * x/y 轴移动
     * @param pos "xm"/"ym"
     */
    move=(nameId:string,pos:string,value:number,time:number)=>{
        return `${nameId} ${pos} ${value} ${time}`
    }

    /**
     * 固定轴抖动
     * @param type "xs"/"ys"
     */
    shake=(nameId:string,type:string,strength:number,time:number=0.5,vibrato:number=6)=>{
        return `${nameId} ${type} ${strength} ${time} ${vibrato}`
    }

    /**
     * 随机抖动
     */
    shakerandom=(nameId:string,strength:number,time:number=0.5,vibrato:number=6)=>{
        return `${nameId} shake ${strength} ${time} ${vibrato}`
    }

    /**
     * 缩放
     */
    scale=(nameId:string,scale:number,time:number=0)=>{
        return `${nameId} scale ${scale} ${time}`
    }

    /**
     * 靠近/返回
     * @param type "close"/"back"
     */
    movein=(nameId:string,type:string){
        return `${nameId} ${type}`
    }

}

const mychar=new myChar();
export default mychar;