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
  logger: { request },
} = lib;

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ ADD LOGGER FOR STREAM.                                                            │
//  └───────────────────────────────────────────────────────────────────────────────────┘
request.stream = {
  success: {
    write: message => {
      request.log({
        level: 'info',
        message: message.trim(),
      });
    },
  },
  error: {
    write: message => {
      request.log({
        level: 'error',
        message: message.trim(),
      });
    },
  },
};

//  ──[ EXPORT MODULE ]──────────────────────────────────────────────────────────────────
module.exports = request;
