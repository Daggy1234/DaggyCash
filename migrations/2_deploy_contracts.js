const DaggyCash = artifacts.require("DaggyCash.sol");

module.exports = function (deployer) {
  deployer.deploy(DaggyCash, 1000);
};
