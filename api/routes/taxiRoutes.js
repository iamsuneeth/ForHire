'use strict';
module.exports = function(app) {
  var taxiController = require('../controllers/taxiController');

  app.route('/taxis')
    // fetches available taxi list
    .get(taxiController.listTaxis)
    // ends trip and add taxi back to available list along with logging price
    .post(taxiController.freeTaxi);


  app.route('/requestTaxi')
    // assign Taxi for the request.
    .get(taxiController.findBestMatch);
};