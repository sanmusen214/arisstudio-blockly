import studentsjson from "./rawjson/students.json";






// 学生姓名
export const students_datamap=[]
for(let stu of studentsjson.students){
    // 中文名，英文名，素材名
    students_datamap.push([
        stu.zhName.replace(/ /g,"").toLowerCase(),
        stu.enName.replace(/ /g,"").toLowerCase(),
        stu.sprName.replace(/ /g,"").toLowerCase()])
}