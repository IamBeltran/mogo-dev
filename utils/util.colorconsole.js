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
const line = chalk.gray('--------------------------------------------------------');
const lineN = chalk.gray('--------------------------------------------------------\n');
const Nline = chalk.gray('\n--------------------------------------------------------');
const NlineN = chalk.gray('\n--------------------------------------------------------\n');
const { bold, italic, green, red, yellow, magenta, blue } = chalk;

//  ──[ EXPORT MODULE ]──────────────────────────────────────────────────────────────────
module.exports.checkMarkX = checkMarkX;
module.exports.checkMarkV = checkMarkV;
module.exports.line = line;
module.exports.lineN = lineN;
module.exports.Nline = Nline;
module.exports.NlineN = NlineN;
module.exports.bold = bold;
module.exports.italic = italic;
module.exports.green = green;
module.exports.red = red;
module.exports.yellow = yellow;
module.exports.magenta = magenta;
module.exports.blue = blue;
