var MyContract = artifacts.require("./SendMessage.sol");

module.exports = function(deployer) {
  deployer.deploy(MyContract, "Hi QuickNode!");
//   TK9dE5XEDZnZGg2kKRqzmzhnN8x1LvN9CY
};