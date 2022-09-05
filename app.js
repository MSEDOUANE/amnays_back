var express = require('express');
const cors = require('cors');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");
const commandsRouter = require("./routes/commands");
const modulesRouter = require("./routes/modules");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/api", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/commands", commandsRouter);
app.use("/api/modules", modulesRouter);

app.get('/api/file/:id', function(req,res){
      res.sendFile('C:/xampp/htdocs/Amnays/Dashboard/img/uploads/'+req.params.id);
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
