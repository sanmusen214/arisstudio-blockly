export function generatefinalCodes(code){
    let resultcode=`
try {
    function makecodetxt(){
        let importArea=false;
        let stagelist=[];
        const errorset=new Set();
        const resmap=new Map();

        let met200=false;

        const case_jump_dict=new Map();

        // 所有阶段代码开始
        ${code}
        // 所有阶段代码结束
        let rescode=""
        if(errorset.size!=0){

            rescode="以下主线块或定义支线块的id重复: "+Array.from(errorset.values()).join(",");
            return rescode;
        }else{
            // 排序
            const sortMap = new Map([...resmap].sort((a, b) => a[0] - b[0]));
            rescode="";
            for(let thiskey of sortMap.keys()){
                if(thiskey>200 && !met200){
                    met200=true;
                    rescode+="jump wholeProjectTail\\n"
                }
                if(thiskey>200){//key就是id
                    // 支线块副本
                    let thisvaluecode=sortMap.get(thiskey);
                    // 如果有 跳转到该支线块 的跳转块
                    if(case_jump_dict.has(thiskey)){
                        for(let timestamp of case_jump_dict.get(thiskey)){
                            rescode+="target "+thiskey+timestamp+"PathStart\\n"
                            rescode+=thisvaluecode;
                            rescode+="jump "+thiskey+timestamp+"PathBack\\n"
                        }
                    }

                }else{
                    // 主线块
                    let thisvaluecode=sortMap.get(thiskey);
                    rescode+=thisvaluecode;
                }

            }
            if(met200){//如果有支线
                rescode+="target wholeProjectTail\\n"
            }
            // 调试用
            window.errorset=errorset;
            window.resmap=resmap;
            window.case_jump_dict=case_jump_dict;
            // 去除换行后多余空格
            rescode=rescode.replace(/ *\\n */g,"\\n");
            return rescode;
        }
        
        return rescode;
        }
        // React里提取txtcode
        txtcode=makecodetxt()
} catch (error) {
    txtcode="生成脚本时出错啦！你可以反馈该问题："+error.message
}

`
    return resultcode
}