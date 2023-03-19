// Utility function to remove base64 URL prefix and store base64-encoded string in a    Uint8Array
// Courtesy: https://gist.github.com/borismus/1032746
export function convertDataURIToBinary(dataURI) {
    let BASE64_MARKER = ';base64,';
    let base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    let base64 = dataURI.substring(base64Index);
    let raw = window.atob(base64);
    let rawLength = raw.length;
    let array = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
    }
    return array;
}



/**
 * 从已上传的文件中根据文件名找到所需要的那个文件
 */
export const findneededFile=(list,fname)=>{
    try {
        for(let fitem of list){
            if(fitem.name===fname){
                console.log(fitem)
                return fitem
            }
        }
    } catch (error) {
        console.log(error)
        return null
    }

    return null
}