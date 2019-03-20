/* eslint-disable strict */

'use strict';

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  DECLARATION OF ERRORS.                                                           │
//  └───────────────────────────────────────────────────────────────────────────────────┘

const INVALID_NODE_ENVIRONMEN_MESSAGE =
  'The NODE_ENV environment variable is specified' +
  'but is not valid, the valid NODE_ENV, The allowed' +
  'environment variables are: ("production"|"development"|"test")';

const ERROR = {
  NULL_NODE_ENV: {
    name: 'ERROR_NULL_NODE_ENV',
    message: 'The NODE_ENV environment variable is required but was not specified.',
  },
  INVALID_NODE_ENVIRONMEN: {
    name: 'ERROR_INVALID_NODE_ENVIRONMENT',
    message: INVALID_NODE_ENVIRONMEN_MESSAGE,
  },
};

//  ──[  EXPORT MODULES  ]───────────────────────────────────────────────────────────────
module.exports = ERROR;
