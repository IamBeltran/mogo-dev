//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  REQUIRE NODE-MODULE DEPENDENCIES.                                                │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const morgan = require('morgan');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  REQUIRE NODEJS-MODULE DEPENDENCIES.                                              │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const path = require('path');
const fs = require('fs');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  DECLARATION OF CONSTANTS.                                                        │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[  UTILS.  ]───────────────────────────────────────────────────────────────────────
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  REQUIRE MY-MODULES DEPENDENCIES.                                                 │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[  PATH MODULES.  ]────────────────────────────────────────────────────────────────
const utils = resolveApp('utils');

//  ──[  REQUIRE MODULES.  ]─────────────────────────────────────────────────────────────
const util = require(utils);

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  DESTRUCTURING DEPENDENCIES.                                                      │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const {
  logger: { stream },
} = util;

//  | morgan(format, options);
const dev = ':method :status :url :response-time ms - :res[content-length]';
const combined =
  ':method :status :url - :remote-addr - :remote-user [:date[clf]] ' +
  'HTTP/:http-version :res[content-length]';

//  ──[  MIDDLEWARES HTTP REQUEST LOGGER  ]──────────────────────────────────────────────
const format = process.env.NODE_ENV !== 'production' ? dev : combined;

//  ──[  EXPORT MODULE  ]────────────────────────────────────────────────────────────────
module.exports.error = morgan(format, {
  skip: (req, res) => {
    return res.statusCode < 400;
  },
  stream: stream.error,
});

//  ──[  EXPORT MODULE  ]────────────────────────────────────────────────────────────────
module.exports.success = morgan(format, {
  skip: (req, res) => {
    return res.statusCode >= 400;
  },
  stream: stream.success,
});
