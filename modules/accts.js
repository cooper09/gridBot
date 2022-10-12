const { ethers } = require('hardhat');
const dotenv = require('dotenv').config(); 

//const rpcURL = process.env.POLYGON_URL;
//const rpcURL = process.env.MAINNET_URL;
const rpcURL = process.env.LOCAL_URL;

const provider = new ethers.providers.JsonRpcProvider( rpcURL);

const acct1 = process.env.ACCT1; //Test Account address
//const acct1 = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"; //Hardhatt Account address
const acct2 = process.env.ACCT2; //local Receiver Account 1

//Private keys
//const privateKey = process.env.TEST_KEY// Test Account 
//const privateKey = process.env.RECEIVER_KEY// Receiver acctount

privateKey = '59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d'  //hardhat fork account

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
