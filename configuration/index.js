/* eslint-disable global-require */
/* eslint-disable strict */

'use strict';

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  REQUIRE THIRDPARTY-MODULES DEPENDENCY.                                           │
//  └───────────────────────────────────────────────────────────────────────────────────┘

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

//  ──[ PATH MODULES.  ]─────────────────────────────────────────────────────────────────
const utils = resolveApp('utils');
const globals = resolveApp('configuration/global');
const dotenvPath = resolveApp('configuration/dotenv/.env');

//  ──[ REQUIRE MODULES.  ]──────────────────────────────────────────────────────────────
const util = require(utils);
const global = require(globals);

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  DESTRUCTURING DEPENDENCIES.                                                      │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const { CustomError } = util;
const { ERROR } = global;

//  ──[  ENVIRONMENT CONSTANTS.  ]───────────────────────────────────────────────────────
const environment = process.env.NODE_ENV;

//  ──[  THROWN ERROR IF NOT SET ENVIRONMENT.  ]─────────────────────────────────────────
if (!environment) {
  throw new CustomError(ERROR.NULL_NODE_ENV);
}
if (
  environment !== 'production' &&
  environment !== 'development' &&
  environment !== 'test'
) {
  throw new CustomError(ERROR.INVALID_NODE_ENVIRONMEN);
}

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  BUILD ENV.                                                                       │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ BUILD ENV.                                                                        │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ BUILD ARRAY PATH ENV FILES  ]────────────────────────────────────────────────────
const dotenvFiles = [
  `${dotenvPath}.${environment}.local`,
  `${dotenvPath}.${environment}`,
  // Don't include `.env.local` for `test` environment
  // since normally you expect tests to produce the same
  // results for everyone
  environment !== 'test' && `${dotenvPath}.local`,
  `${dotenvPath}`,
].filter(Boolean);

//  ──[ SEARCH FILES AND SET VARIABLES  ]────────────────────────────────────────────────
dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv-expand')(
      require('dotenv').config({
        path: dotenvFile,
      }),
    );
  }
});

//  ──[  EXPORT MODULE  ]────────────────────────────────────────────────────────────────
module.exports.SERVER = require('./server');
module.exports.MONGODB = require('./mongodb');
module.exports.ERROR = require('./global/error');
module.exports.HTTP_STATUS_CODE = require('./global/httpstatuscode');
