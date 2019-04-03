//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE THIRD-PARTY MODULES DEPENDENCY.                                           │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const mongoose = require('mongoose');

//  ──[ SET MONGOOSE  ]──────────────────────────────────────────────────────────────────
//  mongoose.set('debug', true);
//  mongoose.Promise = Promise;

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
const configurations = resolveApp('configuration');

//  ──[ REQUIRE MODULES.  ]──────────────────────────────────────────────────────────────
const util = require(utils);
const configuration = require(configurations);

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DESTRUCTURING DEPENDENCIES.                                                       │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ LOGGERS.  ]──────────────────────────────────────────────────────────────────────
const { middleware } = util;

//  ──[ DESTRUCTURING LOGGERS.  ]────────────────────────────────────────────────────────

//  ──[ BUILD THE CONNECTION STRING.  ]──────────────────────────────────────────────────
const {
  MONGODB: { SERVER: server, HOST: host, PORT: port, NAME: name, OPTIONS: options },
} = configuration;

//  mongodb://username:password@host1:port1/database?options
const databaseUrl = `${server}${host}:${port}/${name}`;

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ CONNECTION STATE/EVENT.                                                           │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ WHEN IT IS DISCONNECTED.  ]──────────────────────────────────────────────────────
mongoose.connection.on('disconnected', () => {
  middleware.DBconnectionOn('disconnected');
});

//  ──[ WHEN IT IS CONNECTED.  ]─────────────────────────────────────────────────────────
mongoose.connection.on('connected', () => {
  middleware.DBconnectionOn('connected');
});

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ CONNECTION EVENTS.                                                                │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ IF THE CONNECTION THROWS AN ERROR.  ]────────────────────────────────────────────
mongoose.connection.on('error', error => {
  middleware.DBconnectionOn('error');
  middleware.error(error, 'CONNECTION');
});

//  ──[ WHEN IT IS RECONNECTED.  ]───────────────────────────────────────────────────────
mongoose.connection.on('reconnected', () => {
  middleware.DBconnectionOn('reconnected');
});

//  ──[ WHEN IT IS CLOSE.  ]─────────────────────────────────────────────────────────────
mongoose.connection.on('close', () => {
  middleware.DBconnectionOn('close');
});

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ CONNECTION STATE.                                                                 │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ WHEN IT IS CONNECTING.  ]────────────────────────────────────────────────────────
mongoose.connection.on('connecting', () => {
  middleware.DBconnectionOn('connecting');
});

//  ──[ WHEN IT IS DISCONNECTING.  ]─────────────────────────────────────────────────────
mongoose.connection.on('disconnecting', () => {
  middleware.DBconnectionOn('disconnecting');
});

//  ──[ WHEN IT IS UNINITIALIZED.  ]─────────────────────────────────────────────────────
mongoose.connection.on('uninitialized', () => {
  middleware.DBconnectionOn('uninitialized');
});

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ PROCESS EVENTS.                                                                   │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ IF THE NODE PROCESS ENDS, CLOSE THE MONGOOSE CONNECTION.  ]──────────────────────
process.on('SIGINT', () => {
  middleware.DBExit();
  mongoose.connection.close(() => {
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  middleware.DBExit();
  mongoose.connection.close(() => {
    process.exit(0);
  });
});

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ MODULE CONNECTION.                                                                │
//  └───────────────────────────────────────────────────────────────────────────────────┘
async function connection() {
  await mongoose
    .connect(databaseUrl, options)
    .then(() => {
      middleware.DBStarted(name, port, databaseUrl);
    })
    .catch(error => {
      middleware.error(error, 'DATABASE');
    });
}

//  ──[ EXPORT MODULE  ]─────────────────────────────────────────────────────────────────
module.exports = connection;
