// 根据时间生成yyyymmddhhmmss，用来下载图片命名
export const generateTime = function () {
    const now = new Date();
    const time =
      now.getFullYear().toString() +
      (now.getMonth() + 1) +
      now.getDate() +
      now.getHours() +
      now.getMinutes() +
      now.getSeconds() +
      now.getMilliseconds() +
      Math.floor(Math.random()*95)+1;
    return time;
  };