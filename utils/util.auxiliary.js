//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE MY-MODULES DEPENDENCIES.                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const { infoMsg } = require('./util.colorconsole');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ MODULE AUXILIARY.                                                                 │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ IS TYPE  ]───────────────────────────────────────────────────────────────────────
function isType(obj) {
  // eslint-disable-next-line prettier/prettier
  return ({}).toString
    .call(obj)
    .match(/\s([a-z|A-Z]+)/)[1]
    .toLowerCase();
}

//  ──[ PROCESS BAR  ]───────────────────────────────────────────────────────────────────
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
    `${infoMsg(`→ PROGRESS [`)} ${bar} ${infoMsg(`]`)} ${percentstring}% ${infoMsg(
      `||`,
    )} ${value}/${total} ${infoMsg(`${label}`)}`,
  );
}

//  ──[ EXPORT MODULE  ]─────────────────────────────────────────────────────────────────
module.exports.isType = isType;
module.exports.processBar = processBar;
