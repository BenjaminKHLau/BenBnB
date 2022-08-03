// Express Setup
// After you setup Sequelize, it's time to start working on getting your Express application set up.

// app.js
// Create a file called app.js in the backend folder. Here you will initialize your Express application.

// At the top of the file, import the following packages:

const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

// Create a variable called isProduction that will be true if the environment 
// is in production or not by checking the environment key in the configuration 
// file (backend/config/index.js):
const { environment } = require('./config');
const isProduction = environment === 'production';

//  Initialize the Express application:
const app = express();

//  Connect the morgan middleware for logging information about requests and responses:
app.use(morgan('dev'));

// Add the cookie-parser middleware for parsing cookies and the 
// express.json middleware for parsing JSON bodies of 
// requests with Content-Type of "application/json".
app.use(cookieParser());
app.use(express.json()); 

// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
  }
  
  // helmet helps set a variety of headers to better secure your app
  app.use(
    helmet.crossOriginResourcePolicy({ 
      policy: "cross-origin" 
    })
  );
  
  // Set the _csrf token and create req.csrfToken method
  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
  );

// backend/app.js
const routes = require('./routes');

// ...

app.use(routes); // Connect all the routes

// backend/app.js
// ...


// backend/app.js
// ...
// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});


// backend/app.js
// ...
const { ValidationError } = require('sequelize');

// ...

// Process sequelize errors
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
  }
  next(err);
});


// backend/app.js
// ...
// Error formatter
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    // title: err.title || 'Server Error',
    message: err.message,
    statusCode: err.status,
    errors: err.errors,
    // stack: isProduction ? null : err.stack
  });
});


module.exports = app;