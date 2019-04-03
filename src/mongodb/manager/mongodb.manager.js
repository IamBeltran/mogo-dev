//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE THIRD-PARTY MODULES DEPENDENCY.                                           │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const { mongoexport, mongoimport } = require('mongopack');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  REQUIRE NODE-MODULE DEPENDENCIES.                                                │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const path = require('path');
const fs = require('fs');

//  ──[  UTILS.  ]───────────────────────────────────────────────────────────────────────
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  REQUIRE MY-MODULES DEPENDENCIES.                                                 │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[  PATHS MODULES.  ]───────────────────────────────────────────────────────────────
const utils = resolveApp('utils');
const configurations = resolveApp('configuration');

//  ──[  REQUIRE MODULES.  ]─────────────────────────────────────────────────────────────
const util = require(utils);
const configuration = require(configurations);

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  DESTRUCTURING DEPENDENCIES.                                                      │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[  LOGGERS.  ]─────────────────────────────────────────────────────────────────────
const { middleware } = util;

//  ──[  BUILD THE CONNECTION STRING.  ]─────────────────────────────────────────────────
const {
  MONGODB: {
    HOST: host,
    PORT: port,
    NAME: name,
    OPTIONS: { user, pass },
  },
} = configuration;

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  DECLARATION OF CONSTANTS.                                                        │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const database = name;
const backupPath = 'src/mongodb/manager/backup/';
const options = { user, pass, host, port, type: 'json' };

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  MODULE BACKUP DATABASE.                                                          │
//  └───────────────────────────────────────────────────────────────────────────────────┘
// optionsBackup = { collection, fields }
async function backupDB(optionsBackup) {
  const { collection, fields } = optionsBackup;
  const destination = `${backupPath}/${database}/${collection}.${options.type}`;
  const optionsExport = Object.assign({}, options, { pretty: true, fields });

  const promiseExport = new Promise((resolve, reject) => {
    mongoexport(database, collection, destination, optionsExport, err => {
      if (err) {
        middleware.error(err, 'BACKUP');
      } else {
        middleware.DBBackup(collection);
      }
      return err ? reject(new Error('Error: Failed backup')) : resolve(true);
    });
  });

  return promiseExport;
}

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  MODULE RESTORE DATABASE.                                                         │
//  └───────────────────────────────────────────────────────────────────────────────────┘
// optionsRestore = { collection }
async function restoreDB(optionsRestore) {
  const { collection } = optionsRestore;
  const destination = `${backupPath}/${database}/${collection}.${options.type}`;

  const promiseRestore = new Promise((resolve, reject) => {
    mongoimport(database, collection, destination, options, err => {
      if (err) {
        middleware.error(err, 'RESTORE');
      } else {
        middleware.DBRestore(collection);
      }
      return err ? reject(new Error('Error: Failed restore')) : resolve(true);
    });
  });

  return promiseRestore;
}

//  ──[  EXPORT MODULE  ]────────────────────────────────────────────────────────────────
module.exports.backup = backupDB;
module.exports.restore = restoreDB;
