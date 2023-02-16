export function generatefinalCodes(code){
    let resultcode=`
try {
    function makecodetxt(){
        let importArea=false;
        let stagelist=[];
        const errorset=new Set();
        const resmap=new Map();

        let met200=false;
        const caseset=new Set();
        const caseerrorset=new Set();
        // 所有阶段代码开始
        ${code}
        // 所有阶段代码结束
        let rescode=""
        if(errorset.size!=0||caseerrorset.size!=0){

            rescode="以下主线块或支线块的id重复: "+Array.from(errorset.values()).join(",")+"\\n以下运行支线块的id重复: "+Array.from(caseerrorset.values()).join(",");
            return rescode;
        }else{
            // 排序
            const sortMap = new Map([...resmap].sort((a, b) => a[0] - b[0]));
            rescode="";
            for(let thiskey of sortMap.keys()){
                if(thiskey>200 && !met200){
                    met200=true;
                    rescode+="jump wholeProjectTail;\\n"
                }
                let thisvaluecode=sortMap.get(thiskey);
                rescode+=thisvaluecode;
            }
            if(met200){//如果有支线
                rescode+="target wholeProjectTail;\\n"
            }

            return rescode;
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