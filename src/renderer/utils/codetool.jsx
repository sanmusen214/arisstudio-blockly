export function generatefinalCodes(code){
    let resultcode=`
try {
    function makecodetxt(){
        let importArea=false;
        let stagelist=[];
        const errorset=new Set();
        const resmap=new Map();
        // 所有阶段代码开始
        ${code}
        // 所有阶段代码结束
        let rescode=""
        if(errorset.size!=0){
            rescode="以下阶段被重复定义: "+Array.from(errorset.values()).join(",")+", 阶段名不能重复";
        }else{
            const sortMap = new Map([...resmap].sort((a, b) => a[0] - b[0]));
            rescode="";
            for(let code of sortMap.values()){
                rescode+=code;
            }
        }
        
        return rescode;
        }
        txtcode=makecodetxt()
} catch (error) {
    txtcode="运行生成码时出错啦！你可以反馈该问题："+error.message
}

`
    return resultcode
}