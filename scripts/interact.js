const TronWeb = require("tronweb");
require("dotenv").config();

const tronWeb = new TronWeb({
    fullHost: "https://nile.trongrid.io",
    privateKey: process.env.PRIVATE_KEY_NILE,
});

async function main() {
    contractAddress = "TTwimyNziKF8eAgFvSq6mSuA7xRFbtrkPv";
    let contract = await tronWeb.contract().at(contractAddress);
    const price = await contract.getTRXToUSDTPrice().call();
    console.log('TRX/USDT Price:', price.toString());

    // let newMessage = prompt("Type your new message: ");
    // let txId = await contract.setMessage(newMessage).send();
    // console.log(
    //   `Check tx on the explorer: https://nile.tronscan.org/#/transaction/${txId}`
    // );

    // lastMessage = await contract.getLastMessage().call();
}

main().catch(console.error);