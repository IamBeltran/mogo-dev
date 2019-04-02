/* eslint-disable no-console */
//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  REQUIRE THIRD-PARTY MODULES DEPENDENCY.                                          │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const ip = require('ip');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE MY-MODULES DEPENDENCIES.                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ COLOR CONSOLE.  ]────────────────────────────────────────────────────────────────
const colorConsole = require('./util.colorconsole');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DESTRUCTURING DEPENDENCIES.                                                       │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const {
  // checkMarkX,
  checkMarkV,
  line,
  lineN,
  Nline,
  NlineN,
  bold,
  // italic,
  // green,
  red,
  yellow,
  // magenta,
  blue,
} = colorConsole;

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  BUILD MODULE LOGGER MIDDLEWARE.                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const middleware = {
  error: (error, context = 'CODE') => {
    const text1 = 'ERROR IN:'.padStart(10);
    const text2 = 'NAME:'.padStart(10);
    const text3 = 'MESSAGE:'.padStart(10);
    const text4 = 'STACK:'.padStart(10);
    console.error(red(`${text1} ${context}`));
    if (error.name) {
      const { name } = error;
      console.error(red(`${text2} ${name}`));
    }
    if (error.message) {
      const { message } = error;
      console.error(red(`${text3} ${message}`));
    }
    if (error.stack) {
      let { stack } = error;
      stack = stack.replace(`${error.name}: ${error.message}\n`, '');
      console.error(red(`${text4} \u2935${Nline}`));
      console.error(red(`${stack}${Nline}`));
    }
  },
  warning: (warning, context = 'CODE') => {
    const text1 = 'WARNING IN:'.padStart(12);
    const text2 = 'NAME:'.padStart(12);
    const text3 = 'MESSAGE:'.padStart(12);
    const text4 = 'STACK:'.padStart(12);

    console.warn(yellow(`${text1} ${context}`));
    if (warning.name) {
      const { name } = warning;
      console.warn(yellow(`${text2} ${name}`));
    }
    if (warning.message) {
      const { message } = warning;
      console.warn(yellow(`${text3} ${message}`));
    }
    if (warning.stack) {
      let { stack } = warning;
      stack = stack.replace(`${warning.name}: ${warning.message}\n`, '');
      console.warn(yellow(`${text4} \u2935${Nline}`));
      console.warn(yellow(`${stack}${Nline}`));
    }
  },
  DBconnectionOn: on => {
    let state;
    let event;
    let message;

    const text1 = 'MONGO DB IS:'.padStart(24);
    const text2 = 'CONNECTION IN STATE:'.padStart(24);
    const text3 = 'CONNECTION ON EVENT:'.padStart(24);

    switch (on) {
      case 'disconnected':
        state = 0;
        event = 'DISCONNECTED';
        message = 'DATABASE CONNECTION TURN-OFF'.padStart(42);
        break;
      case 'connected':
        state = 1;
        event = 'CONNECTED';
        message = 'CONNECTION ESTABLISHED'.padStart(39);
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
        message = 'FAILED TO CONNECT TO DB ON STARTUP'.padStart(45);
        break;
      case 'reconnected':
        event = 'RECONNECTED';
        message = 'CONNECTION REESTABLISHED'.padStart(40);
        break;
      case 'close':
        event = 'CLOSE';
        message = 'CONNECTION CLOSED'.padStart(36);
        break;
      default:
        break;
    }

    console.log(`${text1} ${blue(`${on.toUpperCase()}`)}`);
    if (state !== undefined) {
      console.log(`${text2} ${blue(`${state}`)}`);
    }
    if (event !== undefined) {
      console.log(`${text3} ${blue(`${event}`)}`);
      console.log(`${lineN}${blue(`${message}`)}`);
    }
    console.log(`${blue(`${line}`)}`);
  },
  DBStarted: (name, port, url) => {
    const text1 = 'CONNECTION ESTABLISHED:'.padStart(24);
    const text2 = 'NAME DATABASE:'.padStart(24);
    const text3 = 'NUMBER THE PORT:'.padStart(24);
    const text4 = 'URI:'.padStart(24);

    console.log(`${text1} ${checkMarkV}`);
    console.log(`${text2} ${blue(`${name}`)}`);
    console.log(`${text3} ${blue(`${parseInt(port, 10)}`)}`);
    console.log(`${text4} ${blue(`${url}`)}${Nline}`);
  },
  DBExit: () => {
    const text1 = 'DB CONNECTION END THROUGH APP TERMINATION'.padStart(48);
    console.log(`${blue(`${text1}`)}${Nline}`);
  },
  DBBackup: collection => {
    const text1 = 'EXPORT COMPLETED:'.padStart(24);
    const text2 = 'COLLECTION:'.padStart(24);
    const text3 = 'CHECK OUTPUT TO VERIFY'.padStart(39);
    console.log(`${text1} ${checkMarkV}`);
    console.log(`${text2} ${blue(`${collection}`)}${Nline}`);
    console.log(`${blue(`${text3}`)}${Nline}`);
  },
  DBRestore: collection => {
    const text1 = 'RESTORE COMPLETED:'.padStart(24);
    const text2 = 'COLLECTION:'.padStart(24);
    const text3 = 'CHECK OUTPUT TO VERIFY'.padStart(39);
    console.log(`${text1} ${checkMarkV}`);
    console.log(`${text2} ${blue(`${collection}`)}${Nline}`);
    console.log(`${blue(`${text3}`)}${Nline}`);
  },
  DBEreased: () => {
    const text1 = 'DATABASE EREASED:'.padStart(24);
    console.log(`${text1} ${checkMarkV}${Nline}`);
  },
  DBSeedStart: () => {
    const text1 = 'START SEEDING:'.padStart(24);
    console.log(`${text1} ${checkMarkV}${Nline}`);
  },
  DBSeedSuccess: () => {
    const text1 = 'SUCCESS:'.padStart(24);
    console.log(`${NlineN}${text1} ${checkMarkV}${Nline}`);
  },
  DBSeedInfo: (modelName, databaseName, dumpsLength) => {
    const text1 = 'FINISHED PROCESS:'.padStart(24);
    const text2 = 'FIELDS:'.padStart(24);
    const text3 = 'COLLECTION:'.padStart(24);
    const text4 = 'DATABASE:'.padStart(24);

    console.log(`${text1} ${checkMarkV}`);
    console.log(`${text2} ${blue(`${parseInt(dumpsLength, 10)}`)}`);
    console.log(`${text3} ${blue(`${modelName.toUpperCase()}`)}`);
    console.log(`${text4} ${blue(`${databaseName.toUpperCase()}`)}`);
    console.log(`${line}`);
  },
  serverStarted: (protocol, hostname, port, environment) => {
    const text1 = 'SERVER STARTED:'.padStart(24);
    const text2 = 'APP IN ENVIRONMENT:'.padStart(24);
    const text3 = 'NUMBER THE PORT:'.padStart(24);
    const text4 = 'INFO SERVER:'.padStart(24);
    const text5 = "ACCESS URL'S:".padStart(24);
    const text6 = 'LOCALHOST:'.padStart(24);
    const text7 = 'LAN:'.padStart(24);
    const text8 = 'Press CTRL-C to stop'.padStart(38);

    console.log(`${text1} ${checkMarkV}`);
    console.log(`${line}`);
    console.log(`${bold(`${text4}`)}`);
    console.log(`${text2} ${blue(`${environment.toUpperCase()}`)}`);
    console.log(`${text3} ${blue(`${parseInt(port, 10)}`)}`);
    console.log(`${line}`);
    console.log(`${bold(`${text5}`)}`);
    console.log(`${text6} ${blue(`${protocol}://${hostname}:${port}`)}`);
    console.log(`${text7} ${blue(`${protocol}://${ip.address()}:${port}`)}`);
    console.log(`${line}`);
    console.log(`${blue(`${text8}`)}`);
  },
  serverOn: (on, bind) => {
    console.log(`${blue(`→ SERVER LISTENING ON ${bind}`)}`);
    console.log(`${blue(`→ SERVER CLOSED ${bind}`)}  `);
    console.log(`${line}`);
  },
};

//  ──[ EXPORT MODULE ]──────────────────────────────────────────────────────────────────
module.exports = middleware;
