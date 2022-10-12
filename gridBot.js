const { ethers } = require('ethers');

const wallet = new ethers.Wallet(privateKey1, provider);

const init = async () => {
    console.log("Fred and Ether...");
    const senderBalanceBefore = await provider.getBalance(acct1);
    const receiverBalanceBefore = await provider.getBalance(acct2);


    console.log("Sender balance: ", ethers.utils.formatEther(senderBalanceBefore));
    console.log("Receiver balance: ", ethers.utils.formatEther(receiverBalanceBefore));

    const tx = await wallet.sendTransaction({
        to: acct2,
        value: ethers.utils.parseEther("0.002")
    })

    await tx.wait();
    console.log("The deal is done: ", tx.hash );

    const senderBalanceAfter = await provider.getBalance(acct1);
    const receiverBalanceAfter = await provider.getBalance(acct2);


    console.log("New Sender balance: ", ethers.utils.formatEther(senderBalanceAfter));
    console.log("New Receiver balance: ", ethers.utils.formatEther(receiverBalanceAfter));

    process.exit();
}

init();
