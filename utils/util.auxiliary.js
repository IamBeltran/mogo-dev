/* eslint-disable no-restricted-globals */
//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE MY-MODULES DEPENDENCIES.                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const { blue } = require('./util.colorconsole');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ MODULE AUXILIARY.                                                                 │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ IS TYPE  ]───────────────────────────────────────────────────────────────────────
function isType(value) {
  // eslint-disable-next-line prettier/prettier
  return ({}).toString
    .call(value)
    .match(/\s([a-z|A-Z]+)/)[1]
    .toLowerCase();
}
//  ──[ NORMALIZE PORT  ]────────────────────────────────────────────────────────────────
function normalizePort(value) {
  const port = parseInt(value, 10);
  if (isNaN(port)) {
    return value;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

//  ──[ PROCESS BAR  ]───────────────────────────────────────────────────────────────────
/**
 *
 * @name  processBar
 * @description   function that returns a text string
 * @param         {string} [label='REGISTRO']
 * @param         {number} total  -
 * @param         {number} value  -
 */
function processBar(label = 'REGISTRO', total, value) {
  let bar = null;
  const percent = value / total;
  let percentstring = percent * 100;
  percentstring = percentstring.toFixed(2);
  // percentage
  if (percent >= 0 && percent < 0.1) {
    bar = '▧□□□□□□□□□';
  } else if (percent >= 0.1 && percent < 0.2) {
    bar = '■▧□□□□□□□□';
  } else if (percent >= 0.2 && percent < 0.3) {
    bar = '■■▧□□□□□□□';
  } else if (percent >= 0.3 && percent < 0.4) {
    bar = '■■■▧□□□□□□';
  } else if (percent >= 0.4 && percent < 0.5) {
    bar = '■■■■▧□□□□□';
  } else if (percent >= 0.5 && percent < 0.6) {
    bar = '■■■■■▧□□□□';
  } else if (percent >= 0.6 && percent < 0.7) {
    bar = '■■■■■■▧□□□';
  } else if (percent >= 0.7 && percent < 0.8) {
    bar = '■■■■■■■▧□□';
  } else if (percent >= 0.8 && percent < 0.9) {
    bar = '■■■■■■■■▧□';
  } else if (percent >= 0.9 && percent < 1) {
    bar = '■■■■■■■■■▧';
  } else if (percent >= 1) {
    bar = '■■■■■■■■■■';
  }

  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(
    `${blue(`PROGRESS [`)} ${bar} ${blue(`]`)} ${percentstring}% ${blue(
      `||`,
    )} ${value}/${total} ${blue(`${label}`)}`,
  );
}

//  ──[ EXPORT MODULE  ]─────────────────────────────────────────────────────────────────
module.exports.isType = isType;
module.exports.normalizePort = normalizePort;
module.exports.processBar = processBar;
