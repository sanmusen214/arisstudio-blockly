export const getBase64 = (file) =>{
  const promise=new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  })
  return promise
}

export const getText=(file)=>{
  const promise=new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file)
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  })
  return promise
}

export const getArrayBuffer=(file)=>{
  const promise=new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file)
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  })
  return promise
}