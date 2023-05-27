class Myspecial{
    /**
     * 注释
     */
    spec=(text:string)=>{
        return `//${text}`
    }
    /**
     * 断点
     */
    breakpoint=()=>{
        return `==`
    }
    /**
     * 等待
     */
    wait=(time:number)=>{
        return `wait ${time}`
    }

    /**
     * 标记
     */
    target=(name:string)=>{
        return `target ${name}`
    }

    /**
     * 显示所有标记
     */
    showtarget=()=>{
        `targets`
    }

    /**
     * 跳转
     */
    jump=(name:string)=>{
        return `jump ${name}`
    }

    /**
     * 设置自动播放速度
     */
    autoplay=(speed:number)=>{
        return `auto ${speed}`
    }

    /**
     * 切换脚本
     */
    switch=(filename:string)=>{
        return `switch ${filename}`
    }
}
const mySpecialer=new Myspecial();
export default mySpecialer;