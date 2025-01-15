// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract USDTVault is Initializable, OwnableUpgradeable {
    IERC20 public usdtToken;

    mapping(address => uint256) public balances;

    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);

    function initialize(address _usdtToken) public initializer {
        __Ownable_init();
        usdtToken = IERC20(_usdtToken);
    }

    modifier onlyPositiveAmount(uint256 amount) {
        require(amount > 0, "Amount must be greater than zero");
        _;
    }

    function deposit(address _address, uint256 amount) external onlyOwner onlyPositiveAmount(amount) {
        require(usdtToken.transferFrom(_address, address(this), amount), "USDT transfer failed");
        balances[msg.sender] += amount;
        emit Deposited(msg.sender, amount);
    }

    function withdraw(uint256 amount, address _address) external onlyOwner onlyPositiveAmount(amount) {
        uint256 contractBalance = usdtToken.balanceOf(address(this));
        require(contractBalance >= amount, "Insufficient contract balance");
        require(usdtToken.transfer(_address, amount), "USDT transfer failed");
        emit Withdrawn(_address, amount);
    }

    function getUSDTBalance() external view returns (uint256) {
        return usdtToken.balanceOf(address(this));
    }

    function getBalance(address user) external view onlyOwner returns (uint256) {
        return balances[user];
    }
}
// (base58) TR1n1bAYXmC55isT64uEJyok38ZTGqXP4M
// (hex) 41a50645f92c7a921f23efd025702c3cb3d16c3778