/* eslint-disable no-console */
//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE NODE-MODULE DEPENDENCIES.                                                 │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const path = require('path');
const fs = require('fs');

//  ──[ UTILS.  ]────────────────────────────────────────────────────────────────────────
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE MY-MODULES DEPENDENCIES.                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ PATHS MODULES.  ]────────────────────────────────────────────────────────────────
const utils = resolveApp('utils');

//  ──[ REQUIRE MODULES.  ]──────────────────────────────────────────────────────────────
const util = require(utils);

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DESTRUCTURING DEPENDENCIES.                                                       │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const { middleware, colorconsole } = util;
const { infoMsg, line, Nline, checkMarkV } = colorconsole;

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF CONSTANTS.                                                         │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ MODULE LOGGER MIDDLEWARE.                                                         │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ EXPORT MODULE  ]─────────────────────────────────────────────────────────────────
module.exports = Object.assign({}, middleware, {
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
    console.log(`${infoMsg(`→ CONNECTION ESTABLISHED:`)} ${checkMarkV}`);
    console.log(`${infoMsg(`→ NAME DATABASE:`)}          ${name.toUpperCase()}`);
    console.log(`${infoMsg(`→ NUMBER THE PORT:`)}        ${parseInt(port, 10)}`);
    console.log(`${infoMsg(`→ URI:`)}                    ${url.toUpperCase()}${Nline}`);
  },
  DBExit: () => {
    console.log(`${infoMsg(`→ MONGODB  CONNECTION END`)}`);
    console.log(`${infoMsg(`→ THROUGH APP TERMINATION`)}${Nline}`);
  },
  DBBackup: collection => {
    console.log(`${infoMsg(`→ EXPORT COMPLETED, CHECK OUTPUT TO VERIFY`)}`);
    console.log(`${infoMsg(`→ COLLECTION: ${collection}`)}${Nline}`);
  },
  DBRestore: collection => {
    console.log(`${infoMsg(`→ RESTORE COMPLETED AND VERIFIED`)}`);
    console.log(`${infoMsg(`→ COLLECTION: ${collection}`)}${Nline}`);
  },
  DBEreased: () => {
    console.log(`${infoMsg(`→ DATABASE EREASED:`)}       ${checkMarkV}`);
    console.log(`${line}`);
  },
  SEEDStart: () => {
    console.log(`${infoMsg(`→ START SEEDING:`)}          ${checkMarkV}`);
    console.log(`${line}`);
  },
  SEEDSuccess: () => {
    console.log(
      `${Nline}\n${infoMsg(`→ SUCCESS`)}                  ${checkMarkV}${Nline}`,
    );
  },
  SEEDInfo: (modelName, databaseName, dumpsLength) => {
    console.log(`${infoMsg(`→ FINISHED PROCESS`)}         ${checkMarkV}`);
    console.log(`${infoMsg(`→ FIELDS:`)}                  ${parseInt(dumpsLength, 10)}`);
    console.log(`${infoMsg(`→ COLLECTION:`)}              ${modelName.toUpperCase()}`);
    console.log(`${infoMsg(`→ DATABASE:`)}                ${databaseName.toUpperCase()}`);
    console.log(`${line}`);
  },
});
