//const { ethers } = require('ethers');
const { ethers } = require('hardhat');
const dotenv = require('dotenv').config();

/***********************************************************************************/ 

// set up prvider, primary and secondary addresses
const {toBytes32, toString, toWei, toEther, toRound } = require('./modules/utils');
const {provider, acct1, acct2, privateKey, signer, account } = require("./modules/accts");
const {logger} = require('./logger.uptop.js');

const {getPrice} = require('./modules/getPrice.js');
const { check_orders } = require('./modules/checkorders');

const { buySwap } = require('./modules/buyswap');
const { sellSwap } = require('./modules/sellswap');

let config = require("./config");

/***********************************************************************************/ 
let buyOrders=[];
let sellOrders=[];
let closedOrders=[];

let orders = [];
let closed = false;
let orderId = 0;
let count = 0;
/***********************************************************************************/ 

const start = async (startPrice) => {
    console.log("Fred and Ether...");

    const networkAddr = await provider.getNetwork();
    console.log("network id: ", networkAddr )

    startPrice = Math.round(startPrice);
    console.log("start price: ", startPrice );

   // cooper s - set buy gried
   if (buyOrders.length == 0 ) {
    for (var i=1; i <= config.NUM_BUY_GRID_LINES; ++i ){
        let price = startPrice - (config.GRID_SIZE*i);
        const buyOrder = {
                            id:i,
                            order: Math.round(price),
                        }
        buyOrders.push(buyOrder)
     }//end for Buy
    }//end if
    //console.log("buyorders: ", buyOrders )

    if (sellOrders.length == 0) {
        for (var i=1; i <= config.NUM_SELL_GRID_LINES; ++i ){
            let price = startPrice + (config.GRID_SIZE*i);
            const sellOrder = {
                                id:i,
                                order: Math.round(price),
                            }
            sellOrders.push(sellOrder)
        }//end for Sell       
    } //end if
    //console.log("sellorders: ", sellOrders )

    //closedOrders.length = 5
    //establish while loop
    while( closedOrders.length < buyOrders.length )  {
        let currentPrice = Math.round(await getPrice()) ;
        console.log("\ncurrent price: ", currentPrice,"\n");

            //cooper s - check to see if the current price is above or below the current buy/sell grid
            if ((currentPrice < buyOrders[buyOrders.length - 1].order) || (currentPrice > sellOrders[sellOrders.length-1].order)) {
                console.log("End of the line: ", currentPrice);
                console.log("Start - finished Tx #: ", count,"\n")
                process.exit(0)
            }//iffy

        //check each buy and sell order to see if can be closed

               /****************************************************************/
    //cooper s - first check buy orders
    await check_orders (currentPrice, buyOrders)
    .then( async res => {
       // console.log("check_buys result: ", res )
        if (res) {
            console.log("We have a successfull buy order: ", res);
            if (!closedOrders.includes(res)) {
                console.log("check_buys - close order: ", res )
                closedOrders.push(res);
                //await buy(res)
                await buySwap( true , account, acct2)
                    .then( async (res) => {
                        console.log("check_buys - buy me babP  ", res);
                        console.log("check_buys - now sell me");
                        //await sell(res)
                        await sellSwap( res, account, acct2, provider)
                            .then(console.log("I'm sold!"))
                            return true;
                        })
            }//end if closeOrders clear
        }//end iffy
    })//end buy orders then

/****************************************************************/
    //cooper s - then check sell orders
    await check_orders (currentPrice, sellOrders)
    .then( async res => {
        //console.log("check_sells result: ", res )
        if (res) {
            console.log("We have a successfull sell order: ", res);
            if (!closedOrders.includes(res)) {
                console.log("check_sells - close order: ", res )
                closedOrders.push(res);
                //await sell(res)
                await sellSwap(res, account, acct2, provider)
                    .then( async (res) => {
                        console.log("check_sells - sell me baby: ", res );
                        console.log("check_sells - now buy me");
                        //await buy(res)
                        await buySwap( false, account, acct2)
                            .then(console.log("I'm bought!"))
                            return true;
                        })
            }//end if closeOrders clear
        }//end iffy
    })//end sell orders then

    }//end while

    console.log("TestBot - Final closed orders: ", closedOrders )
    process.exit(0);
}

/***********************************************************************************/ 

const init = async() => {
    return await getPrice();
}//end init

setInterval ( async () => {
    console.log("Gridbot 1.0\n");
    start(await init());
    ++count;
    console.log("Start - finished Tx #: ", count,"\n")
    //process.exit(0);
//}, 3000) //every 3 seconds
}, 60000 ) //every minute
//}, 300000 ) //every 5 minutes
//}, 900000 ) //every 15 minutes
//}, 1800000 ) //every 30 minutes
//}, 3600000 ) //every hour

