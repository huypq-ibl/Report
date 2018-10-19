pragma solidity ^0.4.16;

contract Send {

    function Send() public {

    }

    function sendTx(address[] to , uint256 value) payable public returns(bool){
        require(msg.value * 1 ether >= value * to.length);
        // value: wei
        uint256 i;
        for (i = 0; i < to.length; i += 1) {
            if (to[i].send(value) == false)
                return false;
        }

        return true;
    }
}