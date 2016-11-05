'use strict';

const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();
const mongoose = require('mongoose');
const cors = require('cors');

const db = mongoose.connection;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost');
db.on('error', console.error.bind(console, 'database connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB!')
});

app.use(cors());

// development error handler
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

// required config
var config = {
  appRoot: __dirname
};

SwaggerExpress.create(config, (err, swaggerExpress) => {

  let port = process.env.PORT || 3000;
  if (err) throw err;

  // install middleware
  swaggerExpress.register(app);

  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log(`try this: curl http://localhost:${port} /hello?name=Scott`);
  }

});

module.exports = app;
