//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  INDEX FILE FOR DATABASE MODULES.                                                 │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[  EXPORT MODULE  ]────────────────────────────────────────────────────────────────
module.exports.connection = require('./connection/mongodb.connect');
module.exports.collection = require('./collection');
module.exports.manager = require('./manager/mongo.manager');
