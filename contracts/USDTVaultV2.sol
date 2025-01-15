// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "./USDTVault.sol";

contract USDTVaultV2 is USDTVault {
    function getBalance(address user) external view returns (uint256) {
        return balances[user];
    }
}