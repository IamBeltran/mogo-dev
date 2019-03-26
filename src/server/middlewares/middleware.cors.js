//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  REQUIRE NODE-MODULE DEPENDENCIES.                                                │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const cors = require('cors');

/**/
const options = {
  /*
  origin:
  methods: [
    'GET',
    'HEAD',
    'POST',
    'PUT',
    'DELETE',
    'CONNECT',
    'OPTIONS',
    'TRACE',
    'PATCH',
  ],
  allowedHeaders:
  */

  exposedHeaders: [
    'Cache-Control',
    'Content-Language',
    'Content-Type',
    'Expires',
    'Last-Modified',
    'Pragma',
  ],
  credentials: true,
  maxAge: 600,
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

//  ──[  EXPORT MODULE  ]────────────────────────────────────────────────────────────────
module.exports = (req, res, next) => {
  cors(options);
  next();
};
