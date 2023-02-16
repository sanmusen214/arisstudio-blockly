/**
 * 文件操作工具类
 */
 import { writeFile } from 'fs';

 export let saveTxtToSystem = async (curPath: string,data: string): Promise<string> => {
    // if (curPath) {
    writeFile(curPath, data, "utf8", ()=>{})
    return curPath
    // }
    // else {
    // const { canceled, filePath } = await dialog.showSaveDialog({})
    // if (!canceled)
    //     await fs.writeFile(filePath, data)
    // return filePath
    // }
}

