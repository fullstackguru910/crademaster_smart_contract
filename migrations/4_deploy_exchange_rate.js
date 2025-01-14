var PriceFeedContract = artifacts.require("./PriceFeed.sol");

module.exports = function(deployer) {
  const priceFeedAddress = "TJL5M1QqL7oF2ceazAFJ2ump9jf87jUqnK";
  deployer.deploy(PriceFeedContract, priceFeedAddress);
  // TTwimyNziKF8eAgFvSq6mSuA7xRFbtrkPv
};
