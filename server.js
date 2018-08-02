const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

//  Define and map the partials
hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs');

// MIDDLEWARE
// Generates date for server.log file
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  // Generate server.log file and appends changes
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log')
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

// Sets absolute path to public directory
app.use(express.static(__dirname + '/public', ));

// Handlebars Helpers
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// Routes
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the site!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    name: '404',
    errors: [
      'No Dice',
      'crashing...'
    ]
  });
});

// Start server on port 3000
app.listen(port, () => {
  console.log(`Nacelles have spun up on port ${port}, Captain.`)
});