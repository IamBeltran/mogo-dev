//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  REQUIRE NODE-MODULE DEPENDENCIES.                                                │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const session = require('cookie-session');
const Keygrip = require('keygrip');
const moment = require('moment');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  REQUIRE NODE MODULE DEPENDENCIES.                                                │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const path = require('path');
const fs = require('fs');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  DECLARATION OF CONSTANTS.                                                        │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[  UTILS.  ]──────────────────────────────────────────────────────────────────────
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  REQUIRE MY-MODULES DEPENDENCIES.                                                 │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[  PATHS MODULES.  ]───────────────────────────────────────────────────────────────
const configurations = resolveApp('configuration');

//  ──[  LOGGERS.  ]─────────────────────────────────────────────────────────────────────
const configuration = require(configurations);

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  DESTRUCTURING DEPENDENCIES.                                                      │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const {
  SERVER: { SERVER_KEY_API: keyApi, SERVER_BASE_URL: baseUrl },
} = configuration;

//  ──[  OPTIONS FOR COOKIE SESSION.  ]──────────────────────────────────────────────────
const expiry = moment().add(1, 'days'); // 1 days
const options = {
  name: 'session_app',
  secret: keyApi,
  keys: new Keygrip(['key1', 'key2'], 'SHA384', 'base64'),
  resave: true,
  saveUninitialized: true,
  cookie: {
    expires: expiry,
    domain: baseUrl,
    secure: true,
    httpOnly: true,
    sameSite: false,
    signed: true,
    overwrite: true,
  },
};

//  ──[  EXPORT MODULE  ]────────────────────────────────────────────────────────────────
module.exports = (req, res, next) => {
  session(options);
  next();
};
