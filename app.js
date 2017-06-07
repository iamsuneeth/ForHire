const express = require('express');
const bodyParser = require('body-parser');

  app = express(),
  port = process.env.PORT || 5000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/taxiRoutes');
routes(app);

app.listen(port);

console.log(`forHire server is running on ${port}`);