//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	INDEX FILE FOR MIDDLEWARES MODULES.																								│
//	└───────────────────────────────────────────────────────────────────────────────────┘

//	──[	EXPORT MODULE	]─────────────────────────────────────────────────────────────────
module.exports.request = require('./middleware.request');
module.exports.session = require('./middleware.session');
module.exports.requestTime = require('./middleware.requesttime');
module.exports.cors = require('./middleware.cors');
/* module.exports.isAuth = require('./middleware.auth'); */
