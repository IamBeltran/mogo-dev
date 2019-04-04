//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE NODEJS-MODULE DEPENDENCIES.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const path = require('path');
const fs = require('fs');

//  ──[ UTILS.  ]───────────────────────────────────────────────────────────────────────
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE MY-MODULES DEPENDENCIES.                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ PATH MODULES.  ]────────────────────────────────────────────────────────────────
const libs = resolveApp('libs');

//  ──[ REQUIRE MODULES.  ]─────────────────────────────────────────────────────────────
const lib = require(libs);

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DESTRUCTURING DEPENDENCIES.                                                       │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const {
  logger: { database, express, server },
} = lib;

//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	BUILD MODULE LOG FILE.																														│
//	└───────────────────────────────────────────────────────────────────────────────────┘
const logger = {
  DBConnectionError: error => {
    database.log({
      level: 'error',
      message: error,
    });
  },
  DBConnectionClose: () => {
    database.log({
      level: 'info',
      message: 'CONNECTION CLOSED',
    });
  },
  DBConnectionStart: (name, port, url) => {
    database.log({
      level: 'info',
      message: { url, port, name },
    });
  },
  DBError: error => {
    database.log({
      level: 'error',
      message: error,
    });
  },
  expressError: message => {
    express.log({
      level: 'error',
      message,
    });
  },
  serverError: error => {
    server.log({
      level: 'error',
      message: error,
    });
  },
  serverClose: () => {
    server.log({
      level: 'info',
      message: 'CONNECTION CLOSED',
    });
  },
  serverStart: (port, host, env) => {
    server.log({
      level: 'info',
      message: { port, host, env },
    });
  },
};

//  ──[ EXPORT MODULE ]──────────────────────────────────────────────────────────────────
module.exports = logger;
