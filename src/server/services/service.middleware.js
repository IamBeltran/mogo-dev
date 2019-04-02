/* eslint-disable no-console */
//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  REQUIRE THIRD-PARTY MODULES DEPENDENCY.                                          │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const chalk = require('chalk');
const ip = require('ip');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  DECLARATION OF CONSTANTS.                                                        │
//  └───────────────────────────────────────────────────────────────────────────────────┘
// const success = chalk.bold.green;

// const checkX = chalk.red('[✘]');
//  ──[  UTILS.  ]───────────────────────────────────────────────────────────────────────
const checkV = chalk.green('[✓]');
const info = chalk.bold.blue;
const url = chalk.blue;
const errorMsg = chalk.bold.red;
const warnMsg = chalk.bold.yellow;
const line = chalk.gray('----------------------------------------------------');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  BUILD MODULE LOGGER MIDDLEWARE.                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const middleware = {
  error: (error, context) => {
    if (context) {
      console.error(errorMsg(`ERROR IN: ${context.toUpperCase()}`));
    } else {
      console.error(errorMsg(`ERROR IN: CODE`));
    }
    if (error.name) {
      const { name } = error;
      console.error(errorMsg(`    NAME: ${name.toUpperCase()}`));
    }
    if (error.message) {
      const { message } = error;
      console.error(errorMsg(` MESSAGE: ${message.toUpperCase()}`));
    }
    if (error.stack) {
      let { stack } = error;
      stack = stack.replace(`${error.name}: ${error.message}\n`, '');
      console.error(errorMsg(`   STACK: \u2935\n${line}`));
      console.error(errorMsg(`${stack.toUpperCase()}\n${line}`));
    }
  },
  warn: (warn, context) => {
    if (context) {
      console.warn(warnMsg(`WARNING IN: ${context.toUpperCase()}`));
    } else {
      console.warn(warnMsg(`WARNING IN: CODE`));
    }
    if (warn.name) {
      const { name } = warn;
      console.warn(warnMsg(`    NAME: ${name.toUpperCase()}`));
    }
    if (warn.message) {
      const { message } = warn;
      console.warn(warnMsg(` MESSAGE: ${message.toUpperCase()}`));
    }
    if (warn.stack) {
      let { stack } = warn;
      stack = stack.replace(`${warn.name}: ${warn.message}\n`, '');
      console.warn(warnMsg(`   STACK: \u2935\n${line}`));
      console.warn(warnMsg(`${stack.toUpperCase()}\n${line}`));
    }
  },
  serverStarted: (protocol, port, hostname, environment) => {
    const text1 = 'SERVER STARTED!'.padStart(22);
    const text2 = 'APP IN ENVIRONMENT:'.padStart(22);
    const text3 = 'NUMBER THE PORT:'.padStart(22);
    const text4 = 'INFO SERVER:'.padStart(22);
    const text5 = 'ACCESS URLS:'.padStart(22);
    const text6 = 'LOCALHOST:'.padStart(22);
    const text7 = 'LAN:'.padStart(22);

    console.log(`${info(`${text1}`)}\t${url(`${checkV}`)}`);
    console.log(`${line}`);
    console.log(`${chalk.bold(`${text4}`)}`);
    console.log(`${line}`);
    console.log(`${text2}\t${url(`${environment.toUpperCase()}`)}`);
    console.log(`${text3}\t${url(`${parseInt(port, 10)}`)}`);
    console.log(`${line}\n`);
    console.log(`${chalk.bold(`${text5}`)}`);
    console.log(`${line}`);
    console.log(`${text6}\t${url(`${protocol}://${hostname}:${port}`)}`);
    console.log(`${text7}\t${url(`${protocol}://${ip.address()}:${port}`)}`);
    console.log(`${line}`);
    console.log(`${chalk.magenta(`       Press ${chalk.italic('CTRL-C')} to stop`)}`);
  },
};

//  ──[  EXPORT MODULE  ]──────────────────────────────────────────────────────────────────
module.exports = middleware;
