const { assert } = require("chai");

const USDTVault = artifacts.require("USDTVault");
const MockERC20 = artifacts.require("MockERC20"); // Mock USDT token for testing

contract("USDTVault", (accounts) => {
  let usdtVault;
  let mockUSDT;
  const owner = accounts[0];
  const user1 = accounts[1];
  const user2 = accounts[2];

  before(async () => {
    // Deploy a mock USDT token and mint some tokens
    mockUSDT = await MockERC20.new("Mock USDT", "USDT", 18, { from: owner });
    await mockUSDT.mint(user1, web3.utils.toWei("1000", "ether"), { from: owner });
    await mockUSDT.mint(user2, web3.utils.toWei("500", "ether"), { from: owner });

    // Deploy the USDTVault contract and initialize it with the mock token
    usdtVault = await USDTVault.new();
    await usdtVault.initialize(mockUSDT.address, { from: owner });
  });

  it("should initialize correctly", async () => {
    const tokenAddress = await usdtVault.usdtToken();
    assert.equal(tokenAddress, mockUSDT.address, "USDT token address is incorrect");
  });

  it("should allow users to deposit USDT", async () => {
    const depositAmount = web3.utils.toWei("100", "ether");

    // Approve the vault to spend user1's USDT
    await mockUSDT.approve(usdtVault.address, depositAmount, { from: user1 });

    // Deposit USDT to the vault
    await usdtVault.deposit(depositAmount, { from: user1 });

    const userBalance = await usdtVault.getBalance(user1);
    const vaultBalance = await mockUSDT.balanceOf(usdtVault.address);

    assert.equal(userBalance.toString(), depositAmount, "User's vault balance is incorrect");
    assert.equal(vaultBalance.toString(), depositAmount, "Vault's USDT balance is incorrect");
  });

  it("should allow the owner to withdraw USDT", async () => {
    const withdrawAmount = web3.utils.toWei("50", "ether");

    // Owner withdraws USDT to user2
    await usdtVault.withdraw(withdrawAmount, user2, { from: owner });

    const user2Balance = await mockUSDT.balanceOf(user2);
    const vaultBalance = await mockUSDT.balanceOf(usdtVault.address);

    assert.equal(
      user2Balance.toString(),
      withdrawAmount,
      "User2's USDT balance is incorrect after withdrawal"
    );
    assert.equal(
      vaultBalance.toString(),
      web3.utils.toWei("50", "ether"),
      "Vault's USDT balance is incorrect after withdrawal"
    );
  });

  it("should not allow non-owners to withdraw USDT", async () => {
    const withdrawAmount = web3.utils.toWei("10", "ether");

    try {
      await usdtVault.withdraw(withdrawAmount, user1, { from: user1 });
      assert.fail("Non-owner should not be able to withdraw");
    } catch (err) {
      assert.include(err.message, "Ownable: caller is not the owner", "Error message is incorrect");
    }
  });

  it("should return correct contract USDT balance", async () => {
    const vaultBalance = await usdtVault.getUSDTBalance();
    assert.equal(
      vaultBalance.toString(),
      web3.utils.toWei("50", "ether"),
      "Contract USDT balance is incorrect"
    );
  });
});