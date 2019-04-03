//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE THIRD-PARTY MODULES DEPENDENCY.                                           │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const mongoose = require('mongoose');

//  ──[  SET MONGOOSE  ]─────────────────────────────────────────────────────────────────
//  mongoose.set('debug', true);
//  mongoose.Promise = Promise;

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

const configurations = resolveApp('configuration');
const utils = resolveApp('utils');

//  ──[  REQUIRE MODULES.  ]─────────────────────────────────────────────────────────────
const configuration = require(configurations);
const util = require(utils);

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  DESTRUCTURING DEPENDENCIES.                                                      │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ DESTRUCTURING  SERVICE.  ]───────────────────────────────────────────────────────
const { middleware } = util;

//  ──[  DESTRUCTURING UTIL.  ]──────────────────────────────────────────────────────────
const {
  CustomError,
  auxiliary: { isType, processBar },
} = util;

//  ──[  DESTRUCTURING LOGGERS.  ]───────────────────────────────────────────────────────

//  ──[ DESTRUCTURING CONFIGURATION.  ]──────────────────────────────────────────────────
const {
  MONGODB: { SERVER: server, HOST: host, PORT: port, NAME: name, OPTIONS: options },
  ERROR,
} = configuration;

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  DECLARATION OF CONSTANTS.                                                        │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[  BUILD THE CONNECTION STRING.  ]─────────────────────────────────────────────────
//  mongodb://username:password@host1:port1/database?options
const databaseUrl = `${server}${host}:${port}/${name}`;

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

async function saveModelAsync(Model, dumps, item, count, seedOptions) {
  const dumpsLength = dumps.length;
  const newModel = new Model(item);

  if (seedOptions.delay) {
    await newModel.save();
    await delay(seedOptions.delayTime);
  } else {
    await newModel.save();
  }
  processBar(seedOptions.labelLog, dumpsLength, count);
}

async function processArray(model, dumps, seedOptions) {
  let count = 0;
  // eslint-disable-next-line no-restricted-syntax
  for (const item of dumps) {
    count += 1;
    // eslint-disable-next-line no-await-in-loop
    await saveModelAsync(model, dumps, item, count, seedOptions);
  }
}

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  CONNECTION STATE/EVENT.                                                          │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[  WHEN IT IS DISCONNECTED.  ]────────────────────────────────────────────────────
mongoose.connection.on('disconnected', () => {
  middleware.DBconnectionOn('disconnected');
});

//  ──[  WHEN IT IS CONNECTED.  ]────────────────────────────────────────────────────────
mongoose.connection.on('connected', () => {
  middleware.DBconnectionOn('connected');
});

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  CONNECTION EVENTS.                                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[  IF THE CONNECTION THROWS AN ERROR.  ]───────────────────────────────────────────
mongoose.connection.on('error', error => {
  middleware.DBconnectionOn('error');
  middleware.error(error, 'CONNECTION');
});

//  ──[  WHEN IT IS RECONNECTED.  ]──────────────────────────────────────────────────────
mongoose.connection.on('reconnected', () => {
  middleware.DBconnectionOn('reconnected');
});

//  ──[  WHEN IT IS CLOSE.  ]────────────────────────────────────────────────────────────
mongoose.connection.on('close', () => {
  middleware.DBconnectionOn('close');
});

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  CONNECTION STATE.                                                                │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[  WHEN IT IS CONNECTING.  ]──────────────────────────────────────────────────────
mongoose.connection.on('connecting', () => {
  middleware.DBconnectionOn('connecting');
});

//  ──[  WHEN IT IS DISCONNECTING.  ]────────────────────────────────────────────────────
mongoose.connection.on('disconnecting', () => {
  middleware.DBconnectionOn('disconnecting');
});

//  ──[  WHEN IT IS UNINITIALIZED.  ]────────────────────────────────────────────────────
mongoose.connection.on('uninitialized', () => {
  middleware.DBconnectionOn('uninitialized');
});

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  PROCESS EVENTS.                                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[  IF THE NODE PROCESS ENDS, CLOSE THE MONGOOSE CONNECTION.  ]─────────────────────
process.on('SIGINT', () => {
  middleware.DBSExit();
  mongoose.connection.close(() => {
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  middleware.DBSExit();
  mongoose.connection.close(() => {
    process.exit(0);
  });
});

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  MODULE SEED DATABASE.                                                            │
//  └───────────────────────────────────────────────────────────────────────────────────┘
async function seedDatabase(model, dumps, seedOptions) {
  const validOptions = ['delay', 'delayTime', 'labelLog'];

  try {
    if (arguments.length < 3) {
      throw new CustomError(ERROR.SEED_MISSING_PARAMETERS);
    }
    if (arguments.length > 3) {
      throw new CustomError(ERROR.SEED_MANY_PARAMETERS);
    }
    if (model !== mongoose.models[`${model.modelName}`]) {
      throw new CustomError(ERROR.INVALID_MODEL);
    }
    if (isType(model) !== 'function') {
      throw new CustomError(ERROR.INVALID_TYPE_MODEL);
    }
    if (isType(dumps) !== 'array') {
      throw new CustomError(ERROR.INVALID_TYPE_DUMPS);
    }
    if (isType(seedOptions) !== 'object') {
      throw new CustomError(ERROR.INVALID_TYPE_SEED_OPTIONS);
    }

    Object.keys(seedOptions).forEach(key => {
      if (!validOptions.includes(key)) {
        throw new CustomError({
          name: 'ERROR_INVALID_SEED_OPTIONS',
          message: `${key} option is invalid in option seed`,
        });
      }
    });

    if (isType(seedOptions.delay) !== 'boolean') {
      throw new CustomError(ERROR.INVALID_TYPE_SEED_OPTIONS_DELAY);
    }
    if (isType(seedOptions.delayTime) !== 'number') {
      throw new CustomError(ERROR.INVALID_TYPE_SEED_OPTION_DELAY_TIME);
    }
    if (isType(seedOptions.labelLog) !== 'string') {
      throw new CustomError(ERROR.INVALID_TYPE_SEED_OPTION_LABEL_LOG);
    }

    await mongoose.connect(databaseUrl, options).then(dataPromise => {
      middleware.DBStarted(name, port, databaseUrl);
      return dataPromise;
    });

    await mongoose.connection
      .dropDatabase()
      .then(() => {
        middleware.DBEreased();
      })
      .then(() => {
        middleware.DBSeedStart();
      });

    await processArray(model, dumps, seedOptions)
      .then(() => {
        middleware.DBSeedSuccess();
      })
      .then(() => {
        const { modelName } = model;
        const databaseName = model.db.name;
        const dumpsLength = dumps.length;

        middleware.DBSeedInfo(modelName, databaseName, dumpsLength);
      });

    await mongoose.connection.close();
  } catch (error) {
    middleware.error(error, 'DATABASE');
  }
  return true;
}

//  ──[  EXPORT MODULE  ]────────────────────────────────────────────────────────────────
module.exports = seedDatabase;
