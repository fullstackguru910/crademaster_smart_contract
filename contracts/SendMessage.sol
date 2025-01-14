// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

contract SendMessage {
    uint256 totalMessages; // Counter for total number of messages
    string lastMessage; // Variable to store the last message

    event NewMessage(address indexed from, string message, uint256 timestamp); // Event to emit when a new message is set

    constructor(string memory _message) {
        setMessage(_message); // Set the initial message when the contract is deployed
    }

    // Function to set a new message
    function setMessage(string memory _message) public {
        require(
            (keccak256(abi.encodePacked(lastMessage)) !=
                keccak256(abi.encodePacked(_message))),
            "Same message" // Check if the new message is different from the last message
        );

        totalMessages += 1; // Increment the total message count
        lastMessage = _message; // Update the last message variable

        emit NewMessage(msg.sender, _message, block.timestamp); // Emit an event for the new message
    }

    // Function to retrieve the last message
    function getLastMessage() public view returns (string memory) {
        return lastMessage; // Get the last message
    }

    // Function to retrieve the total number of messages
    function getTotalMessages() public view returns (uint256) {
        return totalMessages; // Get the total number of messages
    }
}