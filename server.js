const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

// logging middle wear
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log(err);
    }
  });
  next();
});


app.use((req, res, next) => {
  res.render("maintenance.hbs");
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('homepage.hbs',{
    pageTitle: 'Homepage',
    welcomeMessage: 'Welcome to the App',
    currentYear: new Date().getFullYear()
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req,res) => {
  res.send({
    errorMessage: 'You sent a shitty request numbnuts!'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
