//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  DECLARATION OF CONSTANTS.                                                        │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[  DEFAULT CONSTANTS  ]──────────────────────────────────────────────────────────────
const DEFAULT_DB_SERVER = 'mongodb://';
const DEFAULT_DB_HOST = 'localhost';
const DEFAULT_DB_PORT = 27017;
const DEFAULT_DB_NAME = 'BUILD';
const DEFAULT_DB_USER = '';
const DEFAULT_DB_PASS = '';

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  MODULE OF CONFIGURATION  OF MONGO DB                                             │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[  EXPORT MODULE  ]────────────────────────────────────────────────────────────────
module.exports = {
  SERVER: process.env.DB_SERVER || DEFAULT_DB_SERVER,
  HOST: process.env.DB_HOST || DEFAULT_DB_HOST,
  PORT: parseInt(process.env.DB_PORT, 10) || parseInt(DEFAULT_DB_PORT, 10),
  NAME: process.env.DB_NAME || DEFAULT_DB_NAME,
  OPTIONS: {
    bufferCommands: false,
    user: process.env.DB_USER || DEFAULT_DB_USER,
    pass: process.env.DB_PASS || DEFAULT_DB_PASS,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4,
  },
};
