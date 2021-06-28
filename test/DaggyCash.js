var DaggyCash = artifacts.require("DaggyCash.sol");

contract('DaggyCash', function(accounts) {
    it('sets total supply upon deployment', function() {
        return DaggyCash.deployed().then((instance) => {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then((totalSupply) => {
            assert.equal(totalSupply.toNumber(), 1000, 'sets total supply to 1000')
        })
    })
})