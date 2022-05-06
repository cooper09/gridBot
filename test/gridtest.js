const {getCurrentPrice} = require('./helpers/getcurrentprice.js');
const {buy} = require('./helpers/buy');
const {sell} = require('./helpers/sell');

const init = async (start) => {
    console.log("Starting price: ", start );

    const currentPrice = await getCurrentPrice();

    console.log("current price: ", currentPrice);

    if (currentPrice > start ) {
         sell();
    } else {
        buy();
    }
    
}//end init

const start = async () => {
    return 5;
}

setInterval ( async () => {
    console.log("tic");
    init(await start());
}, 3000)
