pragma solidity ^0.4.26;

contract ERC20Interface {
    function balanceOf(address whom) view public returns (uint);
}

contract MyContract {

    struct responseBalance {
        address walletAddress;
        uint walletBalance;
    }

    mapping(uint256 => responseBalance) balances;
    uint256[] public result;

    function getBalances(address[] _tokenAddressList, address _walletAddress) view public returns (uint256[]) {

        for (uint i=0; i < _tokenAddressList.length; i++) {
            uint balance = ERC20Interface(_tokenAddressList[i]).balanceOf(_walletAddress);
            responseBalance storage response = balances[i];
            response.walletAddress = _walletAddress;
            response.walletBalance = balance;
            result.push(response);
        }
        return result;
    }
}

/* 
Sorry, I know it doesnt work, I don't have much experience with solidity, but I am guessing that it would be a
smart contract that will call other smart contract's balanceOf() function to retrieve the token balance of queried wallet _tokenAddress
*/