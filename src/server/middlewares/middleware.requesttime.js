//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  REQUIRE NODE-MODULE DEPENDENCIES.                                                │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const moment = require('moment');

const requestTime = (req, _res, next) => {
  req.requestTime = moment()
    .locale('es-us')
    .format('YYYY-MM-YYYY, hh:mm:ss a');
  next();
};

//  ──[  EXPORT MODULE  ]────────────────────────────────────────────────────────────────
module.exports = requestTime;
