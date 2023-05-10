class myImage{
    /**
     * 渐入
     * @param nameId 素材昵称
     */
    show=(nameId)=>{
        return `${nameId} show`
    }

    /**
     * 渐出
     * @param nameId 素材昵称
     */
    hide=(nameId)=>{
        return `${nameId} show`
    }

    /**
     * 直接出现
     * @param nameId 素材昵称
     */
    appear=(nameId)=>{
        return `${nameId} appear`
    }

    /**
     * 直接消失
     * @param nameId 素材昵称
     */
    disappear=(nameId)=>{
        return `${nameId} disappear`
    }

    /**
     * 透明度变化
     * @param nameId 素材昵称
     * @param alpha 0~1 透明度
     * @param time 渐变时间
     */
    fade=(nameId, alpha:number, time:number=0)=>{
        return `${nameId} fade ${alpha} ${time}`
    }

    /**
     * 单独设置x/y/z坐标
     * @param nameId 素材昵称
     * @param axis x/y/z
     * @param value 值
     */
    setaxis=(nameId, axis, value:number)=>{
        return `${nameId} ${axis} ${value}`
    }

    /**
     * 设置x，y坐标
     * @param nameId 素材昵称
     * @param x 坐标
     * @param y 坐标
     */
    postition=(nameId, x:number, y:number)=>{
        return `${nameId} ${x} ${y}`
    }

    /**
     * 单独沿着x/y移动
     * @param nameId 素材昵称
     * @param axis xm/ym
     * @param value 值
     * @param time 时间
     */
    moveaxis=(nameId, axis, value:number, time:number=0.5)=>{
        return `${nameId} ${axis} ${value} ${time}`
    }

    /**
     * x，y平面移动
     * @param nameId 素材昵称
     * @param x 值
     * @param y 值
     * @param time 时间
     */
    movepostition=(nameId, x:number, y:number, time:number=0.5)=>{
        return `${nameId} pm ${x} ${y} ${time}`
    }

    /**
     * x/y 轴抖动
     * @param nameId 昵称
     * @param axis xs/ys
     * @param strength 抖动强度
     * @param time 时间
     * @param vibrato 抖动频率
     */
    shakeaxis=(nameId, axis, strength:number, time:number=0.5, vibrato:number=6)=>{
        return `${nameId} ${axis} ${strength} ${time} ${vibrato}`
    }

    /**
     * 随机抖动
     * @param nameId 昵称
     * @param strength 抖动强度
     * @param time 时间
     * @param vibrato 抖动频率
     */
    shakerandom=(nameId, strength, time:number=0.5, vibrato:number=6)=>{
        return `${nameId} shake ${strength} ${time} ${vibrato}`
    }


    /**
     * 在 x 和 y 轴同时缩放
     * @param nameId 昵称
     * @param value 值
     * @param time 时间
     */
    scale=(nameId, value:number, time:number=0)=>{
        return `${nameId} scale ${value} ${time}`
    }

}

const myImager=new myImage()
export default myImager