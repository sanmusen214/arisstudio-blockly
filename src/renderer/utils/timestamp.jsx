// 根据时间生成yyyymmddhhmmss，用来下载图片命名
// 最多2000个不同的数
function bigfunc(){
  if(!window.numinbigfunc){
    window.numinbigfunc=0
  }
  function smallfunc(){
    window.numinbigfunc+=1
    return "tstamp"+window.numinbigfunc
  }

  return smallfunc
}






export const generateTime=bigfunc()

