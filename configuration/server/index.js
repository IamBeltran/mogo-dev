//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  DECLARATION OF CONSTANTS.                                                        │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[  DEFAULT CONSTANTS  ]────────────────────────────────────────────────────────────
const DEFAULT_SERVER_PROTOCOL = 'http';
const DEFAULT_SERVER_HOSTNAME = 'localhost';
const DEFAULT_SERVER_PORT = 3001;
const DEFAULT_SERVER_BASE_URL = 'http://localhost:3001';
const DEFAULT_SERVER_KEY_API = 'MabelPines565';

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  MODULE OF CONFIGURATION  OF SERVER                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[  EXPORT MODULE  ]────────────────────────────────────────────────────────────────
module.exports = {
  SERVER_PROTOCOL: process.env.SERVER_PROTOCOL || DEFAULT_SERVER_PROTOCOL,
  SERVER_HOSTNAME: process.env.SERVER_HOSTNAME || DEFAULT_SERVER_HOSTNAME,
  SERVER_PORT: parseInt(process.env.SERVER_PORT, 10) || parseInt(DEFAULT_SERVER_PORT, 10),
  SERVER_BASE_URL: process.env.SERVER_BASE_URL || DEFAULT_SERVER_BASE_URL,
  SERVER_KEY_API: process.env.SERVER_KEY_API || DEFAULT_SERVER_KEY_API,
};
