const TronWeb = require("tronweb");
const prompt = require("prompt-sync")();
require("dotenv").config();

const tronWeb = new TronWeb({
  fullHost: "https://nile.trongrid.io",
  privateKey: process.env.PRIVATE_KEY_NILE,
});

async function sendMessage() {
  contractAddress = "TK9dE5XEDZnZGg2kKRqzmzhnN8x1LvN9CY";
  let contract = await tronWeb.contract().at(contractAddress);
  let lastMessage = await contract.getLastMessage().call();
  console.log(`The current message is: ${lastMessage}`);

  let input = prompt("Do you want to send a new message? ([1]: Yes, [2]: No) ");

  if (input == 1) {
    let newMessage = prompt("Type your new message: ");
    let txId = await contract.setMessage(newMessage).send();
    console.log(
      `Check tx on the explorer: https://nile.tronscan.org/#/transaction/${txId}`
    );

    lastMessage = await contract.getLastMessage().call();
    console.log(`The current message is: ${lastMessage}`);
  }
}

sendMessage();