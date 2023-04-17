import studentsjson from "./rawjson/students.json";
import soundsjson from "./rawjson/sound.json"





// 学生姓名
export const students_datamap=[]
for(let stu of studentsjson.students){
    // 中文名，素材名
    students_datamap.push([
        stu.zhName.replace(/ /g,"").toLowerCase(),
        stu.sprName.replace(/ /g,"")])
}

// 音效
export const sounds_datamap=soundsjson.sounds