const { ROBURNA, BUSD } = require("../config/constants");
const { web3rpc } = require("./web3");

const pairAbi = require("../config/abi/Pair.json");
const ercAbi = require("../config/abi/ERC20.json");

async function getRoburnaPrice() {
  const rba_price = await getTokenPrice(
    ROBURNA.pairs.bnb.address,
    ROBURNA.pairs.bnb.tokenIndex
  );
  const busd_price = await getBusdPrice();

  return {
    rbaPriceBnb: rba_price,
    rbaPriceUsd: rba_price * busd_price,
    bnbPrice: busd_price,
  };
  //   return rba_price * busd_price;
}

async function getTokenPrice(pair_address, token_index) {
  const tokenContract = new web3rpc.eth.Contract(pairAbi, pair_address);
  const reserves = await tokenContract.methods.getReserves().call();
  const [token, wbnb] =
    token_index == 0 ? [reserves[0], reserves[1]] : [reserves[1], reserves[0]];

  return wbnb / token;
}

async function getRoburnaPool() {
  const reserves = await pairContract.methods.getReserves().call();
  return [reserves[0], reserves[1]];
}

async function getBusdPrice() {
  const price = await getTokenPrice(BUSD.pairs.bnb.address, 0);
  return price;
}

async function getTotalSupply() {
  const totalSupply = await roburnaContract.methods.totalSupply().call();
  return totalSupply / 1e18;
}

async function getTokenTotalSupply(token_address, token_decimals) {
  const tokenContract = new web3rpc.eth.Contract(ercAbi, token_address);
  const totalSupply = await tokenContract.methods.totalSupply().call();
  return totalSupply / Math.pow(10, token_decimals);
}

module.exports = {
  getBusdPrice,
  getRoburnaPrice,
  getTotalSupply,
  getRoburnaPool,
  getTokenPrice,
  getTokenTotalSupply,
};
