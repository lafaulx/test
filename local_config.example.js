var NODEJS_ADDR = process.env.NODEJS_ADDR || 'localhost';
var NODEJS_PORT = process.env.NODEJS_PORT || 3000

module.exports = {
  NODEJS_ADDR: NODEJS_ADDR,
  NODEJS_PORT: NODEJS_PORT,

  API_ORIGIN: 'http://' + NODEJS_ADDR + ':' + NODEJS_PORT
};