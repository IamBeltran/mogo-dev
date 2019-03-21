/* eslint-disable no-console */
//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  REQUIRE THIRD-PARTY MODULES DEPENDENCY.                                          │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const chalk = require('chalk');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  DECLARATION OF CONSTANTS.                                                        │
//  └───────────────────────────────────────────────────────────────────────────────────┘
// const successMsg = chalk.bold.green;
// const urlMsg = chalk.blue;
// const checkMarkX = chalk.red('[✘]');
//  ──[  UTILS.  ]───────────────────────────────────────────────────────────────────────
const checkMark = chalk.green('[✓]');
const infoMsg = chalk.bold.blue;
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
  connectionOn: on => {
    const mongoOn = on;
    let state;
    let event;
    let msg;

    switch (mongoOn) {
      case 'disconnected':
        state = 0;
        event = 'DISCONNECTED';
        msg = '→ DATABASE CONNECTION TURN-OFF';
        break;
      case 'connected':
        state = 1;
        event = 'CONNECTED';
        msg = '→ CONNECTION ESTABLISHED';
        break;
      case 'connecting':
        state = 2;
        break;
      case 'disconnecting':
        state = 3;
        break;
      case 'uninitialized':
        state = 99;
        break;
      case 'error':
        event = 'ERROR';
        msg = '→ FAILED TO CONNECT TO DB ON STARTUP';
        break;
      case 'reconnected':
        event = 'RECONNECTED';
        msg = '→ CONNECTION REESTABLISHED';
        break;
      case 'close':
        event = 'CLOSE';
        msg = '→ CONNECTION CLOSED';
        break;
      default:
        break;
    }

    console.log(`${infoMsg(`→ MONGO DB IS:`)}            ${mongoOn.toUpperCase()}`);
    if (state !== undefined) {
      console.log(`${infoMsg(`→ CONNECTION IN STATE:`)}    ${state}`);
    }
    if (event !== undefined) {
      console.log(`${infoMsg(`→ CONNECTION ON EVENT:`)}    ${event}`);
      console.log(`${line}\n${infoMsg(`${msg}`)}`);
    }
    console.log(`${infoMsg(`${line}`)}`);
  },
  DBStarted: (name, port, url) => {
    console.log(`${infoMsg(`→ CONNECTION ESTABLISHED:`)} ${checkMark}`);
    console.log(`${infoMsg(`→ NAME DATABASE:`)}          ${name.toUpperCase()}`);
    console.log(`${infoMsg(`→ NUMBER THE PORT:`)}        ${parseInt(port, 10)}`);
    console.log(`${infoMsg(`→ URI:`)}                    ${url.toUpperCase()}\n${line}`);
  },
  DBSExit: () => {
    console.log(`${infoMsg(`→ MONGODB  CONNECTION END`)}`);
    console.log(`${infoMsg(`→ THROUGH APP TERMINATION`)}\n${line}`);
  },
};

//  ──[  EXPORT MODULE  ]──────────────────────────────────────────────────────────────────
module.exports = middleware;
