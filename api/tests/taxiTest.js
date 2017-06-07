const model = require('../models/taxi');

// fore hire test
let taxi = model.findBestMatch({x:23.022,y:2.122},false);
console.log("hired: ",taxi);
 //

 // stop 
 let signature = {
     'isSpecial':false,
     'id':taxi.id
 }
 let result = model.FreeTaxi(signature,168.022,52.0332);
 console.log(result);