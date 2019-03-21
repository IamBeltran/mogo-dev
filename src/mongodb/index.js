//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  INDEX FILE FOR DATABASE MODULES.                                                 │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[  EXPORT MODULE  ]────────────────────────────────────────────────────────────────
module.exports.connection = require('./connection/mongodb.connect');
module.exports.seed = require('./seed/mongodb.seed');
