// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DaggyCash {

	// Name
	string public name = "DaggyCash";

	string public symbol = "DAGCASH";

	string public standard = "DaggyCash v1.0.0";

	uint256 public totalSupply;

	mapping(address => uint256) public balanceOf;

	event Transfer(
		address indexed _from,
		address indexed _to,
		uint256 _value
	);


	constructor(uint256 _initalSupply) public {

		// Given All initial tokens to admin
		balanceOf[msg.sender] = _initalSupply;
		totalSupply = _initalSupply;
		
	}

	function transfer(address _to, uint256 _value) public returns (bool success) {
		require(balanceOf[msg.sender] >= _value);
		balanceOf[msg.sender] -= _value;
		balanceOf[_to] += _value;
		emit Transfer(msg.sender, _to, _value);
		return true;
	}

		

	

}