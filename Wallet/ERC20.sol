pragma solidity ^0.4.16;
contract owner {
    address public ownerAddress;
    
    function owner() public {
        ownerAddress = msg.sender;
    }
    
}
contract ERC20 is owner{
    string public name;
    string public symbol;
    uint256 public totalSupply;
    address[] public test;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public  allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
    event Burn(address indexed from, uint256 value);

    function ERC20(
        string _name,
        string _symbol,
        uint256 _totalSupply
    ) public 
    {
        name = _name;
        symbol = _symbol;
        totalSupply = _totalSupply;
        balanceOf[ownerAddress] = totalSupply;
    }

    function _transfer(address _from, address _to, uint256 _value) internal {
        require(balanceOf[_from] >= _value);
        require(_value >= 0);
        
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(_from, _to, _value);
    }
    
    function transferAll(address _to) external returns(bool success) {
        uint256 _value = balanceOf[msg.sender];
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);
        return true;
    }
    
    function transfer(address[] to, uint256 value) external returns(bool success) {
        require(balanceOf[msg.sender] == value * to.length);

        for (uint256 i = 0; i < to.length; i++) {
            // _transfer(msg.sender, to[i], value);
            test.push(to[i]);
        }
        return success = true;
    }
    
    function transferFrom(address _from, address _to, uint256 _value) public returns(bool success) {
        require(allowance[_from][msg.sender] >= _value);

        allowance[_from][msg.sender] -= _value;
        _transfer(_from, _to, _value);

        return success = true;
    }

    function approve(address _spender, uint256 _value) public returns(bool success) {
        require(balanceOf[msg.sender] >= _value);
        allowance[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);

        return success = true;
    }

    function burn(uint256 _value) public returns(bool success) {
        require(balanceOf[msg.sender] >= _value);

        balanceOf[msg.sender] -= _value;
        totalSupply -= _value;
        
        emit Burn(msg.sender, _value);

        return success = true;
    }

    function burnFrom(address _from, uint256 _value) public returns(bool success) {
        require(allowance[_from][msg.sender] >= _value);
        require(balanceOf[_from] >= _value);

        balanceOf[_from] -= _value;
        allowance[_from][msg.sender] -= _value;
        totalSupply -= _value;

        emit Burn(_from, _value);
        return true;
    }
}
