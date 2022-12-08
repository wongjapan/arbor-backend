var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TokenSchema = new Schema({
  chainId: Number,
  address: String,
  name: String,
  symbol: String,
  decimals: Number,
  totalSupply: String,
});

module.exports = mongoose.model("Token", TokenSchema);
