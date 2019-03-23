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
    message: 'The NODE_ENV environment variable is required but was not specified',
  },
  INVALID_NODE_ENVIRONMEN: {
    name: 'ERROR_INVALID_NODE_ENVIRONMENT',
    message: INVALID_NODE_ENVIRONMEN_MESSAGE,
  },
  SEED_MISSING_PARAMETERS: {
    name: 'ERROR_SEED_MISSING_PARAMETERS',
    message: 'Missing parameters in the seed function',
  },
  SEED_MANY_PARAMETERS: {
    name: 'ERROR_SEED_MANY_PARAMETERS',
    message: 'Many parameters in the seed function',
  },
  INVALID_MODEL: {
    name: 'ERROR_INVALID_MODEL',
    message: 'The inserted model does not belong in the database',
  },
  INVALID_TYPE_MODEL: {
    name: 'ERROR_INVALID_TYPE_MODEL',
    message: 'The type of model inserted is invalid',
  },
  INVALID_TYPE_DUMPS: {
    name: 'ERROR_INVALID_TYPE_DUMPS',
    message: 'The type of dumps inserted is invalid',
  },
  INVALID_TYPE_SEED_OPTIONS: {
    name: 'ERROR_INVALID_TYPE_SEED_OPTIONS',
    message: 'The type of seed options inserted is invalid',
  },
  INVALID_TYPE_SEED_OPTION_DELAY: {
    name: 'ERROR_INVALID_TYPE_SEED_OPTION_DELAY',
    message: 'The type of seed option delay inserted is invalid',
  },
  INVALID_TYPE_SEED_OPTION_DELAY_TIME: {
    name: 'ERROR_INVALID_TYPE_SEED_OPTION_DELAY_TIME',
    message: 'The type of seed option delay time inserted is invalid',
  },
  INVALID_TYPE_SEED_OPTION_LABEL_LOG: {
    name: 'ERROR_INVALID_TYPE_SEED_OPTION_LABEL_LOG',
    message: 'The type of seed option label log time inserted is invalid',
  },
};

//  ──[  EXPORT MODULES  ]───────────────────────────────────────────────────────────────
module.exports = ERROR;
