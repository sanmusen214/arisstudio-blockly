/**
 * 保存到localStorage，data为Object
 */
export function saveToLocalStorage(keyname,data){
    const workspaceString=JSON.stringify(data)
    localStorage.setItem(keyname,workspaceString)
}

export function saveTxt(txt){
    console.log(txt)
}