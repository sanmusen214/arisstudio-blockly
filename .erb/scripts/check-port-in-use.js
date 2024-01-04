import chalk from 'chalk';
import detectPort from 'detect-port';

// 根据环境变量获取
const port = process.env.PORT || 3000;
// const port = 21411;

detectPort(port, (err, availablePort) => {
  if (port !== String(availablePort)) {
    // throw new Error(
    //   chalk.whiteBright.bgRed.bold(
    //     `Port "${port}" on "localhost" is already in use. Please use another port. ex: PORT=${availablePort} npm start`
    //   )
    // );
  } else {
    process.exit(0);
  }
});
