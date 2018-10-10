pragma solidity ^0.4.16;

interface TOKEN {
        function transfer(address to, uint256 value) external returns(bool success);
}

contract TransferToken {

    uint256 public price = 1 ether; // token/ether
    bool public a;
    TOKEN public token;
    
    function TransferToken(address tokenAddress) public {
        token = TOKEN(tokenAddress);
    }
    
    function () payable public {
        uint256 balance = msg.value;
        uint256 amount = balance / price;
        
        a = token.transfer(msg.sender, amount);

    }
}
