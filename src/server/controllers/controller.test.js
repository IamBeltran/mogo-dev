//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  REQUIRE THIRDPARTY MODULES DEPENDENCY.                                           │
//  └───────────────────────────────────────────────────────────────────────────────────┘

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

//  ──[  PATHS MODULES.  ]───────────────────────────────────────────────────────────────
const configurations = resolveApp('configuration');

//  ──[  MODULES.  ]─────────────────────────────────────────────────────────────────────
const configuration = require(configurations);

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  DESTRUCTURING DEPENDENCIES.                                                      │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const { HTTP_STATUS_CODE } = configuration;

//  ──[  EXPORT MODULE ]─────────────────────────────────────────────────────────────────
module.exports = async (req, res, next) => {
  const ERROR_ARGUMENTS_EMPTY = new Error('ARGUMENTS NULL');
  const ERROR_ARGUMENTS_WRONG = new Error('ARGUMENTS WRONG');
  ERROR_ARGUMENTS_EMPTY.name = 'ERROR_REQUEST_NULL';
  ERROR_ARGUMENTS_WRONG.name = 'ERROR_ARGUMENTS_WRONG';
  const test = 'GOOD';
  //  const test = 'EMPY';
  //  const test = 'WRONG';
  //  const test = 'UNKNOWN';
  try {
    if (test === 'EMPY') {
      throw ERROR_ARGUMENTS_EMPTY;
    }
    if (test === 'WRONG') {
      throw ERROR_ARGUMENTS_WRONG;
    }
    if (test === 'UNKNOWN') {
      throw new Error();
    }
    res.status(200).json({
      success: true,
      status: 200,
      'status-text': HTTP_STATUS_CODE['200'],
      'response-time': req.requestTime,
      message: 'response success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
