var TRXtoUSDTExchangeContract = artifacts.require("./TRXtoUSDTExchange.sol");

module.exports = function(deployer) {
  const usdtTokenAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
  const priceFeedAddress = "0xF4C5e535756D11994fCBB12Ba8adD0192D9b88be";
  deployer.deploy(TRXtoUSDTExchangeContract, usdtTokenAddress, priceFeedAddress);
  // THpKgSctmcp1a1C6w4KCKSs56cfkLjJEJs
};
