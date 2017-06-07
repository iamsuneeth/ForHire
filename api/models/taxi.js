const BST = require('../utils/BST');
/*  Initialization begins */
const MINUTE_PRICE = 1;
const DISTANCE_PRICE = 2;
const PINK_EXTRA_PRICE = 5;
const taxis = {
    1: {
        id: 1,
        x: 1.2000,
        y: 2.0200,
        forHire: true,
        startTime: 0
    },
    2: {
        id: 2,
        x: 5.7000,
        y: 10.4800,
        forHire: true,
        startTime: 0
    },
    3: {
        id: 3,
        x: 0.5000,
        y: 23.0200,
        forHire: true,
        startTime: 0
    },
    4: {
        id: 4,
        x: 4.3040,
        y: 1.1200,
        forHire: true,
        startTime: 0
    },
    5: {
        id: 5,
        x: 6.3600,
        y: 3.3200,
        forHire: true,
        startTime: 0
    }
};
const spcialTaxis = {
    1: {
        id: 1,
        x: 1.2000,
        y: 2.0200,
        forHire: true,
        startTime: 0
    },
    2: {
        id: 2,
        x: 5.7000,
        y: 10.4800,
        forHire: true,
        startTime: 0
    },
    3: {
        id: 3,
        x: 0.5000,
        y: 23.0200,
        forHire: true,
        startTime: 0
    },
    4: {
        id: 4,
        x: 4.3040,
        y: 1.1200,
        forHire: true,
        startTime: 0
    },
    5: {
        id: 5,
        x: 6.3600,
        y: 3.3200,
        forHire: true,
        startTime: 0
    }
};

let TaxiList = new BST();
// for pinkcars
let specilTaxiList = new BST();
Object.keys(taxis).forEach((id) => {
    // taking reference point as (0,0);
    taxis[id].key = Math.sqrt(Math.pow(taxis[id].x, 2) + Math.pow(taxis[id].y, 2));
    TaxiList.add(taxis[id]);
})
Object.keys(spcialTaxis).forEach((id) => {
    // taking reference point as (0,0);
    spcialTaxis[id].key = Math.sqrt(Math.pow(spcialTaxis[id].x, 2) + Math.pow(spcialTaxis[id].y, 2));
    specilTaxiList.add(spcialTaxis[id]);
})

/*  Initialization ends */
exports.FreeTaxi = (signature, x, y) => {
    if (!signature.isSpecial) {
        let price = calculateFare(new Date().getTime() - taxis[signature.id].startTime, { x, y }, { x: taxis[signature.id].x, y: taxis[signature.id].y }, signature.isSpecial);
        taxis[signature.id].x = x;
        taxis[signature.id].y = y;
        taxis[signature.id].key = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        if (TaxiList.add(taxis[signature.id])) {
            taxis[signature.id].forHire = true;
            console.log(`cutomer owes : ${price}`);
            return true;
        }
        return false;
    } else {
        let price = calculateFare(new Date().getTime() - taxis[signature.id].startTime, { x, y }, taxis[signature.id], signature.isSpecial);
        spcialTaxis[signature.id].x = x;
        spcialTaxis[signature.id].y = y;
        spcialTaxis[signature.id].key = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        if (specilTaxiList.add(spcialTaxis[signature.id])) {
            spcialTaxis[signature.id].forHire = true;
            console.log(`customer owes : ${price}`);
            return true;
        }
        return false;
    }
}
exports.assignTaxi = (signature) => {
    if (!signature.isSpecial) {
        TaxiList.remove(taxis[signature.id].key);
    } else {
        specilTaxiList.remove(spcialTaxis[signature.id].key);
    }
}
exports.findBestMatch = (location, isSpecial) => {
    if (!isSpecial) {
        let taxi = TaxiList.findBestMatch(Math.sqrt(Math.pow(location.x, 2) + Math.pow(location.y, 2)));
        taxis[taxi.id].forHire = false;
        taxis[taxi.id].startTime = new Date().getTime();
        return taxi;
    } else {
        let taxi = specilTaxiList.findBestMatch(Math.sqrt(Math.pow(location.x, 2) + Math.pow(location.y, 2)));
        spcialTaxis[taxi.id].forHire = false;
        return taxi;
    }
}

exports.listTaxis = () => {
    let allTaxis = {
        normal: [],
        pink: []
    };
    Object.keys(taxis).forEach((key) => (
        taxis[key].forHire ? allTaxis.normal.push(taxis[key]) : ''
    ));
    Object.keys(spcialTaxis).forEach((key) => (
        spcialTaxis[key].forHire ? allTaxis.pink.push(spcialTaxis[key]) : ''
    ));

    return allTaxis;
}

calculateFare = (time, currentPos, initialPos, isSpecial) => {
    let distance = Math.sqrt((Math.pow(currentPos.x, 2) - Math.pow(initialPos.x, 2)) + (Math.pow(currentPos.y, 2) - Math.pow(initialPos.y, 2)));
    price = Math.floor(time / 60000) * MINUTE_PRICE + distance * DISTANCE_PRICE + (isSpecial ? PINK_EXTRA_PRICE : 0);
    return price.toFixed(2);
}