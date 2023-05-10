class myLoad{
    /**
     * 加载spr角色
     * @param type spr:默认,sprc:通讯
     * @param nameId 素材昵称
     * @param sprName 素材文件名称
     */
    loadspr=(type, nameId, sprName)=>{
        return `load ${type} ${nameId} ${sprName}`
    }

    /**
     * 加载自定义角色
     * @param type spr:默认,sprc:通讯
     * @param nameId 人物昵称
     * @param scale 缩放
     * @param idle 空闲状态
     * @param sprName 素材文件名称，带后缀
     * @param imageList 图片列表
     */
    loaddefspr=(type, nameId, scale:number, idle, sprName, imageList)=>{
        return `load ${type} ${nameId} ${scale} ${idle} ${sprName} ${imageList}`
    }

    /**
     * 加载 png 角色
     */



    /**
     * 加载 前景/中景/背景 图片
     * @param type fg前/mg中/bg背景/sfx音效/bgm背景音乐
     * @param nameId 素材昵称
     * @param fileName 文件名带后缀
     */
    load=(type, nameId, fileName)=>{
        return `load ${type} ${nameId} ${fileName}`
    }
}

const myLoader=new myLoad()
export default myLoader