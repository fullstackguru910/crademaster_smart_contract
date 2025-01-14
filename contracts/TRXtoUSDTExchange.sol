// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

// Chainlink Price Feed Interface
interface AggregatorV3Interface {
    function latestRoundData() external view returns (
        uint80 roundId,
        int256 answer,
        uint256 startedAt,
        uint256 updatedAt,
        uint80 answeredInRound
    );
}

// Interface for interacting with USDT token (TRC-20)
interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract TRXtoUSDTExchange {

    address public owner;
    address public usdtTokenAddress;
    AggregatorV3Interface internal priceFeed;

    // Event to log swaps
    event Swapped(address indexed user, uint256 trxAmount, uint256 usdtAmount);

    // Constructor to initialize with USDT address and Chainlink price feed
    constructor(address _usdtTokenAddress, address _priceFeedAddress) {
        owner = msg.sender;
        usdtTokenAddress = _usdtTokenAddress;
        priceFeed = AggregatorV3Interface(_priceFeedAddress); // Chainlink price feed address
    }

    // Modifier to ensure only the owner can withdraw USDT
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can withdraw");
        _;
    }

    // Function to get the current TRX/USDT exchange rate from Chainlink
    function getTRXToUSDTPrice() public view returns (uint256) {
        (, int256 price, , , ) = priceFeed.latestRoundData();
        require(price > 0, "Invalid price data");
        return uint256(price); // The price is returned in the smallest unit, so divide it accordingly
    }

    // Function to receive TRX (this contract will accept TRX transfers)
    receive() external payable {}
}