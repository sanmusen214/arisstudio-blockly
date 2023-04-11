class Character{
    nickname=""
    sourcename=""
    show=false
    facestate=""
    emo=""
    light=1
    x=0
    y=0
    close=false
    level=0
    down=false

    constructor(nickname,sourcename=""){
        this.nickname=nickname
        this.sourcename=sourcename
    }

    setshow(){
        this.show=true
    }

    sethide(){
        this.show=false
    }

    setlight(num){
        this.light=num
    }

    setstate(id){
        this.facestate=id
    }

    setemo(id){
        this.emo=id
    }

    setdown(){
        this.down=true
    }

    setup(){
        this.down=false
    }

    setx(x){
        this.x=x
    }

    sety(y){
        this.y=y
    }

    setclose(){
        this.close=true
    }

    setback(){
        this.close=false
    }

    setlevel(level){
        this.level=level
    }
}

function darkAll(charset){
    // 把所有学生变0.5 highlight
    for(let each in charset){
        charset[each].setlight(0.5)
    }
}

function parseChar(rawtext,endpoint=-1){

    const lines=rawtext.split("\n")
    // target集合
    const targets={}
    for(let i=0;i<lines.length;i++){
        // 去除两侧空白
        lines[i]=lines[i].trim()
        // 解析target目标
        if(lines[i].startsWith("target")){
            targets[""+lines[i].split(" ")[1]]=i
        }
    }
    // console.log(targets)
    // 指定调试点
    const debugp=endpoint
    // 按行分析
    let nowp=0
    // 是否结束
    let isend=false
    // 维护人物们
    let res={}
    // 这行内容
    let linetxt=""
    // 运行次数，防止死循环
    let runticks=0
    // 一些临时的效果，下一行会清空
    let tempfunc=()=>{}
    while(!isend){
        // 死循环判断
        runticks+=1
        if(runticks>2000){
            res=null
            isend=true
            // console.log("死循环")
            throw "死循环或脚本太长"
            break
        }
        // 超出脚本行数判断
        if(nowp>=lines.length){
            isend=true
            // console.log("解析结束")
            break
        }
        // 空行判断
        if(lines[nowp].length==0){
            nowp+=1
            continue
        }
        // 该行文本分割
        linetxt=lines[nowp].split(" ")
        // 命令跳转
        if(linetxt.length>=1 && linetxt[0]==="jump"){
            const jumptarget=linetxt[1]
            if(jumptarget in targets){
                // 跳转
                nowp=targets[jumptarget]
                // console.log("跳转至:"+jumptarget)
                continue
            }else{
                // 找不到target
                // console.log("找不到要跳转的target: "+jumptarget)
            }
        }
        // 如果这行有新效果 清除上一行临时效果
        if(linetxt.length>=1 && linetxt[0]!=="load" && linetxt[0]!=="jump" && linetxt[0]!=="target"){
            tempfunc()
            tempfunc=()=>{}
        }
        // 人物加载
        if(linetxt.length>=1 && linetxt[0]==="load" && ["spr","sprC","custom","customC","char","charC"].includes(linetxt[1])){
            res[linetxt[2]]=new Character(linetxt[2])
        }
        // 人物相关指令
        if(linetxt.length>=1 && Object.keys(res).includes(linetxt[0])){
            const thischar=res[linetxt[0]]
            if(["show","showD"].includes(linetxt[1])){
                thischar.setshow()
                if(linetxt[1]==="show"){
                    thischar.setlight(1)
                }
            }else if(["hide","hideD"].includes(linetxt[1])){
                thischar.sethide()
                if(linetxt[1]==="hide"){
                    thischar.setlight(0)
                }
            }else if(["hl","highlight"].includes(linetxt[1])){
                thischar.setlight(linetxt[2]-0)
            }else if(["state"].includes(linetxt[1])){
                thischar.setstate(linetxt[2])
            }else if(["emo"].includes(linetxt[1])){
                thischar.setemo(linetxt[2])
                tempfunc=()=>{
                    thischar.setemo("")
                }
            }else if(["down"].includes(linetxt[1])){
                thischar.setdown()
            }else if(["up","empty"].includes(linetxt[1])){
                thischar.setup()
            }else if(["x","moveX","move"].includes(linetxt[1])){
                thischar.setx(linetxt[2]-0)
            }else if(["y","moveY"].includes(linetxt[1])){
                thischar.sety(linetxt[2]-0)
            }else if(["close"].includes(linetxt[1])){
                thischar.setclose()
            }else if(["back"].includes(linetxt[1])){
                thischar.setback()
            }else if(["z"].includes(linetxt[1])){
                thischar.setlevel(linetxt[2]-0)
            }
        }
        // 高亮某个人物
        if(linetxt.length>=2 && linetxt[0]==="th" && Object.keys(res).includes(linetxt[1])){
            darkAll(res)
            res[linetxt[1]].setlight(1)
        }
        // 到debug断点处
        if(nowp===debugp){
            isend=true
            break
        }
        // 解析完这行，行数加1
        nowp+=1
    }
    return res
}

/**
 * 解析txt，维护人物的状态
 * @param debugline 对哪一行debug -1为脚本末尾 -2为找注释行
 */
export function identifytxt(txt,debugline=-1){
    try {
        return {success:true,res:parseChar(txt,debugline)}
    } catch (error) {
        return {success:false,res:error}
    }
}