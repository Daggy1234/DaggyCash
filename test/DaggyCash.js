var DaggyCash = artifacts.require("DaggyCash.sol");


const total_supply = 1000;
const global_standard = "DaggyCash v1.0.0"


contract('DaggyCash', function(accounts) {


    var tokenInstance;

    it('initialised contract with right values', function() {
        return DaggyCash.deployed().then((instance) => {
            tokenInstance = instance;
            return tokenInstance.name();
        }).then((name) => {
        assert.equal(name, 'DaggyCash', 'token has the right name')
        return tokenInstance.symbol();
    }).then((symbol) => {
        assert.equal(symbol, 'DAGCASH', 'token has the right symbol')
        return tokenInstance.standard();
    }).then((standard) => {
        assert.equal(standard, global_standard, 'Has the right standard')
    })
    })

    it('sets total supply upon deployment', function() {
        return DaggyCash.deployed().then((instance) => {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then((totalSupply) => {
            assert.equal(totalSupply.toNumber(), total_supply, 'sets total supply to 1000');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(((adminBalance) => {
            assert.equal(adminBalance.toNumber(), total_supply, 'allocates the initial supply to admin')
        }))
    })


    it('transfers token ownership', function() {
        return DaggyCash.deployed().then((instance) => {
            tokenInstance = instance;
            return tokenInstance.transfer.call(accounts[1], 999999999999);
        }).then(assert.fail).catch((error) => {
            assert(error.toString().indexOf('revert') >= 0, 'error message must contain revert!');
            return tokenInstance.transfer.call(accounts[1], 25, { from: accounts[0] });
        }).then((success) => {
            assert.equal(success, true, 'transfer true!')
            return tokenInstance.transfer(accounts[1], 25, { from: accounts[0] });
        }).then((receipt)=> {
            assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
            assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account the tokens are transferred from');
            assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account the tokens are transferred to');
            assert.equal(receipt.logs[0].args._value, 25, 'logs the transfer amount');
            return tokenInstance.balanceOf(accounts[1]);
        }).then((balance) => {
            console.log(balance);
            assert(balance.toNumber(), 25, 'adds the amount to reciever account');
            return tokenInstance.balanceOf(accounts[0]);
        }).then((balance) => {
            assert.equal(balance.toNumber(), 975, 'deducts amount');
        })
    })
})