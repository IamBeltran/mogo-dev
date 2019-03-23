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
const services = resolveApp('src/mongodb/services');
const configurations = resolveApp('configuration');

//  ──[  REQUIRE MODULES.  ]─────────────────────────────────────────────────────────────
const service = require(services);
const configuration = require(configurations);

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  DESTRUCTURING DEPENDENCIES.                                                      │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[  LOGGERS.  ]─────────────────────────────────────────────────────────────────────
const { middleware } = service;

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
//  │  DECLARATION OF CONSTANTS.                                                        │
//  └───────────────────────────────────────────────────────────────────────────────────┘
// optionsBackup = { collection, fields }
function backupBD(optionsBackup) {
  const { collection, fields } = optionsBackup;
  const destination = `${backupPath}/${database}/${collection}.${options.type}`;
  const optionsExport = Object.assign({}, options, { pretty: true, fields });

  mongoexport(database, collection, destination, optionsExport, err => {
    if (err) {
      middleware.error(err, 'BACKUP');
    } else {
      middleware.DBBackup(collection);
    }
  });
}

function restoreBD(optionsRestore) {
  const { collection } = optionsRestore;
  const destination = `${backupPath}/${database}/${collection}.${options.type}`;

  mongoimport(database, collection, destination, options, err => {
    if (err) {
      middleware.error(err, 'RESTORE');
    } else {
      middleware.DBRestore(collection);
    }
  });
}

//  ──[  EXPORT MODULE  ]────────────────────────────────────────────────────────────────
module.exports.backup = backupBD;
module.exports.restore = restoreBD;
