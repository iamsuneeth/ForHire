'use strict';
const taxiModel = require('../models/taxi');
let taxis = require('../models/taxi');

exports.list_available_taxis = function(req, res) {
  res.json(taxis.findBestMatch(req.params.location));
};


exports.listTaxis = function(req, res){
  res.json(taxis.listTaxis());
}

exports.freeTaxi = function(req, res) {
  let result = taxis.FreeTaxi(req.params.signature,req.params.x,req.params.y);
  if(result){
    res.json(true);
  }else{
    res.json({"error":"register failed"});
  }
};


exports.findBestMatch = function(req, res) {
  let result = taxis.findBestMatch(req.params.location,req.params.isSpecial);
  if(result!==null){
    res.json(result);
  }else{
    if(req.params.isSpecial)
      res.json({"error":"No pink taxis available, please try non pink once"});
    else{
      res.json({"error":"No Notmal Taxis available, you can try pink taxis for a change"});
    }
  }
};