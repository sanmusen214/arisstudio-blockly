const I64BIT_TABLE =
 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'.split('');
 
export function gethash(input){
    let hash = 5381;
    let i = input.length - 1;
    
    if(typeof input == 'string'){
        for (; i > -1; i--)
            hash += (hash << 5) + input.charCodeAt(i);
    }else{
        for (; i > -1; i--)
            hash += (hash << 5) + input[i];
    }
    let value = hash & 0x7FFFFFFF;
    
    let retValue = '';
    do{
        retValue += I64BIT_TABLE[value & 0x3F];
    }
    while(value >>= 6);
    
    return retValue;
}

console.log(gethash("阿露"))