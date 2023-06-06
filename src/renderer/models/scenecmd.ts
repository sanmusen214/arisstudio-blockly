class Myscene{

    /**
     * @param type focus/smoke/rain/snow/dust
     * @param state show/hide
     */
    scene=(type:string,state:string)=>{
        return `sc ${type} ${state}`
    }

    /**
     * 未完继续
     */

    continue=()=>{
        return `sc continue`
    }

    /**
     * 结束
     */
    end=(text:string)=>{
        return `sc end ${text}`
    }
    /**
     * 启用/禁用场景音效
     */
}

const myScener=new Myscene();
export default myScener;