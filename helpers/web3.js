const Web3 = require("web3");
require("dotenv").config();

const options = {
  timeout: 30000, // ms
  clientConfig: {
    keepalive: true,
    keepaliveInterval: 60000, // ms
  },
  // Enable auto reconnection
  reconnect: {
    auto: true,
    delay: 5000, // ms
    maxAttempts: 5,
    onTimeout: true,
  },
};

const RPC = "https://bsc-dataseed1.ninicoin.io/";
const web3rpc = new Web3(RPC);

module.exports = {
  web3rpc,
};
