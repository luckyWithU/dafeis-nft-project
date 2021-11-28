const DafeisContract = artifacts.require("DafeisContract");
const baseURL = "https://ipfs.io/ipfs/QmakY2zq9B2haFCp99s77cZBTNNPC79aEkoCTz2AnMSKCo/"

module.exports = function(deployer) {
  deployer.deploy(DafeisContract, baseURL);
};