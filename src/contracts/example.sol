//SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

contract Example{

    uint256 public number;
    string public str;
    uint256[] public array;

    function setNumber(uint256 _number)public {
        number = _number;
    }

    function setStr(string memory _str)public {
        str = _str;
    }

    function addArray(uint256 _number)public{
        array.push(_number);
    }
}    