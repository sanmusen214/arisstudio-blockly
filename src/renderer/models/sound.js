/**
 * 音效对象
 */
class Sound{
    constructor(){
        this.bgmNickName=""
        this.bgmSourceName=""
        this.bgmState=0//1or0
        this.bgmVoice=1

        this.soundEffectNickName=""
        this.soundEffectSourceName=""
        this.soundEffectState=0//1or0
        this.soundEffectVoice=1
    }

    /**
     * 解析块，返回用来 设置bgm 的脚本
     * @param version 版本
     * @param nickname 素材代号
     * @param sourcename 素材文件名
     */
    static setbgm_str(version,nickname,sourcename){
        // TODO: 返回脚本字符串
        return 
    }

    setbgm_obj(version,sentence="",nickname="",sourcename=""){
        if(sentence){
            // TODO: 用正则解析
        }else if(nickname && sourcename){
            this.bgmNickName=nickname
            this.bgmSourceName=sourcename
        }
    }
}