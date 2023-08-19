const { ethers } = require('ethers');
const dotenv = require('dotenv').config(); 

//const rpcURL = process.env.POLYGON_URL;
//const rpcURL = process.env.MAINNET_URL;
const rpcURL = process.env.LOCAL_URL;

const provider = new ethers.providers.JsonRpcProvider( rpcURL);

const acct1 = process.env.ACCT1; //Test Account address
//const acct1 = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"; //Hardhatt Account address
const acct2 = process.env.ACCT2; //local Receiver Account 1

//Private keys
const privateKey = process.env.TEST_KEY// Test Account 
//const privateKey = process.env.RECEIVER_KEY// Receiver acctount
//const privateKey = process.env.HARDHAT_KEY// Hardhat acctount

//signer account
const signer = new ethers.Wallet(privateKey); //
const account = signer.connect(provider);  //The signer is Test Account
//
module.exports.provider = provider;
module.exports.acct1 = acct1;
module.exports.acct2 = acct2;
module.exports.privateKey = privateKey;
module.exports.account = account;
module.exports.signer = signer;
