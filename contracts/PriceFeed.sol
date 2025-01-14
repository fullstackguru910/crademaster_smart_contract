// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

// WinkLink Price Feed Interface
interface IWinkLinkAggregator {
    function latestAnswer() external view returns (int256);
}

contract PriceFeed {

    address public owner;
    IWinkLinkAggregator internal priceFeed;

    // Event to log price fetch
    event PriceFetched(uint256 trxToUsdtPrice);

    // Constructor to initialize with WinkLink price feed
    constructor(address _priceFeedAddress) {
        owner = msg.sender;
        priceFeed = IWinkLinkAggregator(_priceFeedAddress); // WinkLink price feed address
    }

    // Function to get the current TRX/USDT price from WinkLink
    function getTRXToUSDTPrice() public view returns (uint256) {
        int256 price = priceFeed.latestAnswer();
        require(price > 0, "Invalid price data");
        return uint256(price); // The price is typically in the smallest unit (like 6 decimals)
    }

    // Function to log the current price
    function logPrice() public {
        uint256 trxToUsdtPrice = getTRXToUSDTPrice();
        emit PriceFetched(trxToUsdtPrice);
    }
}