//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE THIRD-PARTY MODULES DEPENDENCY.                                           │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const winston = require('winston');
const moment = require('moment-timezone');
require('winston-daily-rotate-file');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE NODE-MODULE DEPENDENCIES.                                                 │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const path = require('path');
const fs = require('fs');
const os = require('os');

//  ──[ UTILS.  ]────────────────────────────────────────────────────────────────────────
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DESTRUCTURING OF OBJETS.                                                          │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ DESTRUCTURING WINSTON.  ]────────────────────────────────────────────────────────
const { format, config, transports } = winston;

//  ──[ DESTRUCTURING FORMAT. ]──────────────────────────────────────────────────────────
const { combine, printf, colorize } = format;

//  ──[ DESTRUCTURING CONFIG.  ]─────────────────────────────────────────────────────────
const { addColors } = config;

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF CONSTANTS.                                                         │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ DIRECTORY FOR LOGS.  ]───────────────────────────────────────────────────────────
const dirLog = resolveApp(`log`);

//  ──[ CREATE DIRECTORY. ]──────────────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-expressions
fs.existsSync(dirLog) || fs.mkdirSync(dirLog);

//  ──[ DATE FOR NAME. ]─────────────────────────────────────────────────────────────────
//  const logDateFormat = moment.tz('America/Mexico_City').format('YYYY-MM-DD');

//  ──[ NAME FOR FILE.  ]────────────────────────────────────────────────────────────────
const nameAudit = `audit.json`;

const nameDatabaseError = `%DATE%-database-error.log`;
const nameDatabaseInfo = `%DATE%-database-info.log`;

const nameExpressError = `%DATE%-express-error.log`;
const nameExpressInfo = `%DATE%-express-info.log`;

const nameRequestError = `%DATE%-request-error.log`;
const nameRequestInfo = `%DATE%-request-info.log`;

const nameServerError = `%DATE%-server-error.log`;
const nameServerInfo = `%DATE%-server-info.log`;

//  ──[ PATH FOR FILE.  ]────────────────────────────────────────────────────────────────
const fileAudit = `${dirLog}/${nameAudit}`;

const fileDatabaseError = `${dirLog}/${nameDatabaseError}`;
const fileDatabaseInfo = `${dirLog}/${nameDatabaseInfo}`;

const fileExpressError = `${dirLog}/${nameExpressError}`;
const fileExpressInfo = `${dirLog}/${nameExpressInfo}`;

const fileRequestError = `${dirLog}/${nameRequestError}`;
const fileRequestInfo = `${dirLog}/${nameRequestInfo}`;

const fileServerError = `${dirLog}/${nameServerError}`;
const fileServerInfo = `${dirLog}/${nameServerInfo}`;

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ OPTIONS FOR MODULE LOGGER.                                                        │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ OPTIONS. ]───────────────────────────────────────────────────────────────────────
const options = {
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'green',
    verbose: 'cyan',
    debug: 'blue',
    silly: 'magenta',
  },
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
  },
};

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ FUNCTIONS TO FORMAT DATA.                                                         │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ APPEND TIMESTAMP. ]──────────────────────────────────────────────────────────────
const appendTimestamp = format((info, opts) => {
  info.timestamp = moment()
    .tz(opts.tz || 'America/Mexico_City')
    .format(opts.format || 'YYYY-MM-DD hh:mm:ss:ms');
  return info;
});

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ FUNCTIONS TO FORMAT TRANSPORTS.                                                   │
//  └───────────────────────────────────────────────────────────────────────────────────┘

const formatConsole = combine(
  colorize({ all: true }),
  format.ms(),
  printf(info => {
    const { timestamp, label, level, message, ms, ...args } = info;
    return Object.keys(args).length
      ? `${ms.padEnd(6)}- ${message}:\n${JSON.stringify(args, null, 2)}`
      : `${ms.padEnd(6)}- ${message}`;
  }),
);

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ SETTINGS OF TRANSPORTS.                                                           │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ SETTING COLORS. ]────────────────────────────────────────────────────────────────
addColors(options.colors);

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ CREATE LOGGER.                                                                    │
//  └───────────────────────────────────────────────────────────────────────────────────┘

const databaseInfo = new winston.transports.DailyRotateFile({
  level: 'info',
  filename: fileDatabaseInfo,
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '100m',
  maxFiles: '14d', // keep logs for 14 days
  auditFile: fileAudit,
});

const databaseError = new winston.transports.DailyRotateFile({
  level: 'error',
  filename: fileDatabaseError,
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '100m',
  maxFiles: '14d', // keep logs for 14 days
  auditFile: fileAudit,
});

const expressInfo = new winston.transports.DailyRotateFile({
  level: 'info',
  filename: fileExpressInfo,
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '100m',
  maxFiles: '14d', // keep logs for 14 days
  auditFile: fileAudit,
});

const expressError = new winston.transports.DailyRotateFile({
  level: 'error',
  filename: fileExpressError,
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '100m',
  maxFiles: '14d', // keep logs for 14 days
  auditFile: fileAudit,
});

const requestInfo = new winston.transports.DailyRotateFile({
  level: 'info',
  filename: fileRequestInfo,
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '100m',
  maxFiles: '14d', // keep logs for 14 days
  auditFile: fileAudit,
});

const requestError = new winston.transports.DailyRotateFile({
  level: 'error',
  filename: fileRequestError,
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '100m',
  maxFiles: '14d', // keep logs for 14 days
  auditFile: fileAudit,
});

const serverInfo = new winston.transports.DailyRotateFile({
  level: 'info',
  filename: fileServerInfo,
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '100m',
  maxFiles: '14d', // keep logs for 14 days
  auditFile: fileAudit,
});

const serverError = new winston.transports.DailyRotateFile({
  level: 'error',
  filename: fileServerError,
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '100m',
  maxFiles: '14d', // keep logs for 14 days
  auditFile: fileAudit,
});

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ CREATE LOGGER.                                                                    │
//  └───────────────────────────────────────────────────────────────────────────────────┘

winston.loggers.add('database', {
  level: 'info',
  levels: options.levels,
  format: format.combine(
    appendTimestamp(),
    format.label({ label: 'database' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  transports: [databaseInfo, databaseError],
  exitOnError: false,
  silent: false,
});

winston.loggers.add('express', {
  level: 'info',
  levels: options.levels,
  format: format.combine(
    appendTimestamp(),
    format.label({ label: 'express' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  transports: [expressInfo, expressError],
  exitOnError: false,
  silent: false,
});

winston.loggers.add('request', {
  level: 'info',
  levels: options.levels,
  format: format.combine(
    appendTimestamp(),
    format.label({ label: 'request' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  transports: [
    requestInfo,
    requestError,
    new transports.Console({
      name: 'CONSOLE_FOR_MIDDLEWARE',
      level: 'debug',
      silent: false,
      stderrLevels: ['error', 'debug', 'info'],
      consoleWarnLevels: ['warn', 'debug', 'info'],
      handleExceptions: false,
      eol: os.EOL,
      json: false,
      colorize: true,
      format: formatConsole,
      options: {
        flags: 'a+',
        encoding: 'utf8',
        mode: 0o666,
      },
    }),
  ],
  exitOnError: false,
  silent: false,
});

winston.loggers.add('server', {
  level: 'info',
  levels: options.levels,
  format: format.combine(
    appendTimestamp(),
    format.label({ label: 'server' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  transports: [serverInfo, serverError],
  exitOnError: false,
  silent: false,
});

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ CREATE LOGGER.                                                                    │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const database = winston.loggers.get('database');
const express = winston.loggers.get('express');
const request = winston.loggers.get('request');
const server = winston.loggers.get('server');

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
module.exports.database = database;
module.exports.express = express;
module.exports.request = request;
module.exports.server = server;
