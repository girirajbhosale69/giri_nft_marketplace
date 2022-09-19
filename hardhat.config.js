const fs = require('fs');
require('@nomiclabs/hardhat-waffle');

const privateKey = fs.readFileSync('.secret').toString().trim();

module.exports = {
  networks: {
    hardhat: {
      url: process.env.NEXT_PUBLIC_API_ENDPOINT,
      chainId: 1337,
    },
  },
  solidity: '0.8.4',
};
