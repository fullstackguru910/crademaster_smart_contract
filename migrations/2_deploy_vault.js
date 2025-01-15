const USDTVault = artifacts.require("USDTVault");

module.exports = async function (deployer, network, accounts) {
  const usdtTokenAddress = "TXYZopYRdj2D9XRtbG411XZZ3kM5VkAeBf"; // Replace with the actual USDT contract address
  await deployer.deploy(USDTVault);
  const vaultInstance = await USDTVault.deployed();

  // Call the initializer
  await vaultInstance.initialize(usdtTokenAddress);
  console.log("USDTVault deployed at:", vaultInstance.address);
};


// const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');
// const USDTVault = artifacts.require("USDTVault");
// const USDTVaultV2 = artifacts.require("USDTVaultV2");

// module.exports = async function (deployer) {
//   const existing = await USDTVault.deployed();
//   const upgraded = await upgradeProxy("TTmxcWL54yPbCacodctG2bHYV3rkH6nw6G", USDTVaultV2, { deployer });
//   console.log("USDTVault upgraded to USDTVaultV2 at:", upgraded.address);
// };