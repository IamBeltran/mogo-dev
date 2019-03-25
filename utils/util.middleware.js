/* eslint-disable no-console */
//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE MY-MODULES DEPENDENCIES.                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ COLOR CONSOLE.  ]────────────────────────────────────────────────────────────────
const colorConsole = require('./util.colorconsole');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DESTRUCTURING DEPENDENCIES.                                                       │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const {
  // checkMarkX,
  // checkMarkV,
  // successMsg,
  errorMsg,
  warnMsg,
  // urlMsg,
  // infoMsg,
  // line,
  // lineN,
  Nline,
  // NlineN,
} = colorConsole;

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  BUILD MODULE LOGGER MIDDLEWARE.                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const middleware = {
  error: (error, context) => {
    if (context) {
      console.error(errorMsg(`ERROR IN: ${context.toUpperCase()}`));
    } else {
      console.error(errorMsg(`ERROR IN: CODE`));
    }
    if (error.name) {
      const { name } = error;
      console.error(errorMsg(`    NAME: ${name.toUpperCase()}`));
    }
    if (error.message) {
      const { message } = error;
      console.error(errorMsg(` MESSAGE: ${message.toUpperCase()}`));
    }
    if (error.stack) {
      let { stack } = error;
      stack = stack.replace(`${error.name}: ${error.message}\n`, '');
      console.error(errorMsg(`   STACK: \u2935${Nline}`));
      console.error(errorMsg(`${stack.toUpperCase()}${Nline}`));
    }
  },
  warning: (warning, context) => {
    if (context) {
      console.warn(warnMsg(`${'→ WARNING IN:'}${context.toUpperCase()}`));
    } else {
      console.warn(warnMsg(`→ WARNING IN: CODE`));
    }
    if (warning.name) {
      const { name } = warning;
      console.warn(warnMsg(`${'→ NAME:'}${name.toUpperCase()}`));
    }
    if (warning.message) {
      const { message } = warning;
      console.warn(warnMsg(`→ MESSAGE: ${message.toUpperCase()}`));
    }
    if (warning.stack) {
      let { stack } = warning;
      stack = stack.replace(`${warning.name}: ${warning.message}\n`, '');
      console.warn(warnMsg(`→ STACK: \u2935${Nline}`));
      console.warn(warnMsg(`${stack.toUpperCase()}${Nline}`));
    }
  },
};

//  ──[  EXPORT MODULE  ]──────────────────────────────────────────────────────────────────
module.exports = middleware;
