const express = require('express');
const indexRoutes = require('./routes/index');
const countryRoutes = require('./routes/country');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

app.listen(
  PORT,
  () => console.log(`Listening at http://localhost:${PORT}`)
);

// Home
app.use(indexRoutes);

// Country
app.use(countryRoutes);