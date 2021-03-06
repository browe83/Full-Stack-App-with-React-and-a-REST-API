// load modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();
app.use(cors());

//import models, routers and connection
const { sequelize, User, Course } = require('./models');
const coursesRouter = require('./routes/courses');
const usersRouter = require('./routes/users');

//test connection to database
(async () => {
  console.log('Testing the connection to the database...');
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// setup morgan which gives us http request logging
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/courses', coursesRouter);
app.use('/api/users', usersRouter);

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});


// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    status: err.status || 500,
    errors: [err.message],
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
