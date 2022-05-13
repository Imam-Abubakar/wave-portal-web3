// SPDX-License-Identifier: UNLICENSED
/*This is the version of the Solidity compiler we want our contract to use. It basically says "when running this, I only want to use version 0.8.0 of the Solidity compiler, nothing lower. Note, be sure that the compiler version is the same in hardhat.config.js.*/
pragma solidity ^0.8.0;
/*Some magic given to us by Hardhat to do some console logs in our contract. It's actually challenging to debug smart contracts but this is one of the goodies Hardhat gives us to make life easier.
*/
import "hardhat/console.sol";

/*So, smart contracts sort of look like a class in other languages, if you've ever seen those! Once we initialize this contract for the first time, that constructor will run and print out that line. Please make that line say whatever you want :)!*/
contract WavePortal {
    uint256 totalWaves;

    constructor() {
        console.log("Yo yo, I am a contract and I am smart");
    }

    function wave() public {
        totalWaves += 1;
        console.log("%s has waved!", msg.sender);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}
    /*
    So, that's how you write a function in Solidity.  And, we also added a totalWaves variable that automatically is initialized to 0. But, this variable is special because it's called a "state variable" and it's cool because it's stored permanently in contract storage.

We also use some magic here with msg.sender. This is the wallet address of the person who called the function. This is awesome! It's like built-in authentication. We know exactly who called the function because in order to even call a smart contract function, you need to be connected with a valid wallet!

In the future, we can write functions that only certain wallet addresses can hit. For example, we can change this function so that only our address is allowed to send a wave. Or, maybe have it where only your friends can wave at you!

*/