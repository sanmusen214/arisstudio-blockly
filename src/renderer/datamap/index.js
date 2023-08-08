import studentsjson from "./rawjson/students.json";
import soundsjson from "./rawjson/sound.json"
import sprjson from "./rawjson/sprname.json"





// 封装人物名字和素材对应表
export const students_datamap=[]
for(let stu of sprjson.data){
    students_datamap.push([
        stu.name,
        stu.sprname
    ])
}

// 封装人物名字和素材的键值对对应表，文件名改小写
const student_datadict={}
for(let stu of sprjson.data){
    student_datadict[stu.sprname]=stu.name
}
/**
 * 给定spr文件名，不含后缀。返回中文名
 */
export function getcnnameof(filename){
    if(student_datadict[filename]){
        return student_datadict[filename]
    }
    return ""
}

// 音效
export const sounds_datamap=soundsjson.sounds