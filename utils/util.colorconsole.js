/* eslint-disable no-console */
//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  REQUIRE THIRD-PARTY MODULES DEPENDENCY.                                          │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const chalk = require('chalk');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  MODULES COLOR CONSOLE.                                                           │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ UTILS.  ]────────────────────────────────────────────────────────────────────────
const checkMarkX = chalk.red('[✘]');
const checkMarkV = chalk.green('[✓]');
const successMsg = chalk.bold.green;
const errorMsg = chalk.bold.red;
const warnMsg = chalk.bold.yellow;
const urlMsg = chalk.blue;
const infoMsg = chalk.bold.blue;
const line = chalk.gray('----------------------------------------------------');
const lineN = chalk.gray('----------------------------------------------------\n');
const Nline = chalk.gray('\n----------------------------------------------------');
const NlineN = chalk.gray('\n----------------------------------------------------\n');

//  ──[ EXPORT MODULE ]──────────────────────────────────────────────────────────────────
module.exports.checkMarkX = checkMarkX;
module.exports.checkMarkV = checkMarkV;
module.exports.successMsg = successMsg;
module.exports.errorMsg = errorMsg;
module.exports.warnMsg = warnMsg;
module.exports.urlMsg = urlMsg;
module.exports.infoMsg = infoMsg;
module.exports.line = line;
module.exports.lineN = lineN;
module.exports.Nline = Nline;
module.exports.NlineN = NlineN;
