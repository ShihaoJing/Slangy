const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const seedDB = require('./seed');

// seed DB

// require routes
var indexRoutes = require('./routes/index');
var userRoutes = require('./routes/user');
var requestRoutes = require('./routes/request');

// app config
const app = new express();
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./static'))

// add routes:
app.use(indexRoutes);
app.use(userRoutes);
app.use(requestRoutes);

  
app.listen(3000, () => console.log("Slangy started..."));