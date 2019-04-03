//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE THIRDPARTY-MODULES DEPENDENCY.                                            │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const methodOverride = require('method-override');
const favicon = require('serve-favicon');
const helmet = require('helmet');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE NODEJS-MODULE DEPENDENCIES.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const path = require('path');
const fs = require('fs');

//  ──[ UTILS.  ]───────────────────────────────────────────────────────────────────────
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF CONSTANTS.                                                         │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ PATH PUBLIC.  ]─────────────────────────────────────────────────────────────────
const pathFavicon = resolveApp('src/server/public/assets/img/favicon/favicon.ico');
const pathPublic = resolveApp('src/server/public');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE MY-MODULES DEPENDENCIES.                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ PATH MODULES.  ]────────────────────────────────────────────────────────────────
const configurations = resolveApp('configuration');
const utils = resolveApp('utils');
const middlewares = resolveApp('src/server/middlewares');
const services = resolveApp('src/server/services');
const routes = resolveApp('src/server/routes');

//  ──[ REQUIRE MODULES.  ]─────────────────────────────────────────────────────────────
const configuration = require(configurations);
const util = require(utils);
const middleware = require(middlewares);
const service = require(services);
const route = require(routes);

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DESTRUCTURING DEPENDENCIES.                                                       │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const {
  HTTP_STATUS_CODE,
  SERVER: { SERVER_BASE_URL: baseurl },
} = configuration;
const { isMobile } = service;
const { index } = route;

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ INSTANTIATE EXPRESS.                                                              │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const app = express();

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ SETTINGS.                                                                         │
//  └───────────────────────────────────────────────────────────────────────────────────┘

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('trust proxy', 1);

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ MIDDLEWARE.                                                                       │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ MIDDLEWARES HTTP REQUEST LOGGER  ]───────────────────────────────────────────────
app.use(middleware.request.error);
app.use(middleware.request.success);

//  ──[ MIDDLEWARES PARSE DATE.  ]───────────────────────────────────────────────────────
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//  ──[ MIDDLEWARES SECURITY.  ]─────────────────────────────────────────────────────────
app.use(methodOverride());
app.use(compression());
app.use(helmet());
app.use(middleware.cors);
app.use(middleware.session);

//  ──[ MIDDLEWARES UTILS.  ]────────────────────────────────────────────────────────────
app.use(middleware.requestTime);
app.use((req, res, next) => {
  res.locals.isMobile = isMobile(req.headers['user-agent']);
  res.locals.baseUrl = baseurl;
  return next();
});

//  ──[ MIDDLEWARES STATIC FILES.  ]─────────────────────────────────────────────────────
app.use(favicon(pathFavicon));
app.use(express.static(pathPublic));

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ ROUTES.                                                                           │
//  └───────────────────────────────────────────────────────────────────────────────────┘

app.use('/', index);

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ ERROR HANDLER.                                                                    │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ CATCH 404.  ]────────────────────────────────────────────────────────────────────
//  HANDLE NOT SPECIFIED ROUTES
//  CATCH 404 AND FORWARD TO ERROR HANDLER
app.use((req, res, next) => {
  next(createError(404));
});

//  ──[ FORWARD TO ERROR HANDLER.  ]─────────────────────────────────────────────────────
// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  const status = err.status || 500;
  const errorName = err.name === 'Error' ? 'ERROR_IN_SERVER' : err.name;
  const errorMessage = err.message || 'An unknown error in server';
  const httpStatus = HTTP_STATUS_CODE[status.toString()];
  const stack = err.stack ? err.stack.replace(`${err.name}: ${err.message}\n`, '') : '';

  res.locals.title = `Error: ${errorName}`;
  res.locals.status = status;
  res.locals.name = errorName;
  res.locals.message = errorMessage;
  res.locals.stack = stack;
  res.locals.httpStatus = httpStatus;

  const message = {
    request: {
      originalurl: req.originalUrl,
      method: req.method,
      ip: req.ip,
    },
    error: {
      status,
      message: errorMessage,
      errorName,
    },
  };

  util.logger.expressError(message);
  util.middleware.error(err, 'Request');

  // render the error page
  res.status(err.status);
  res.render('error');
});

//  ──[ EXPORT MODULE  ]────────────────────────────────────────────────────────────────
module.exports = app;
