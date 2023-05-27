class Mysound{

    /**
     * 播放/暂停
     * @param nameId 声音名称
     * @param type "play"/"pause"/"stop"
     */
    play=(nameId:string,type:string)=>{
        return `${nameId} ${type}`
    }

    /**
     * 音量设置
     */
    volume=(nameId:string,value:number)=>{
        return `${nameId} volume ${value}`
    }

    /**
     * 音量渐变
     */
    fade=(nameId:string,value:number,time:number)=>{
        return `${nameId} fade ${value} ${time}`
    }

    /**
     * 循环/一次
     * @param type "loop"/"once"
     */
    loop=(nameId:string,type:string)=>{
        return `${nameId} ${type}`
    }

}
const mysound=new Mysound();
export default mysound;