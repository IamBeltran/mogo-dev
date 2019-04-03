//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  REQUIRE NODE-MODULE DEPENDENCIES.                                                │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const cors = require('cors');

/**/
const options = {
  // origin:
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
  allowedHeaders: [
    'Accept',
    'Access-Control-Allow-Request-Method',
    'Authorization',
    'Cache-Control',
    'Content-Type',
    'Origin',
    'X-API-KEY',
    'X-Requested-With',
  ],
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
/*
// Configurar cabeceras y cors
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});
*/
