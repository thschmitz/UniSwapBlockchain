require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/pVUzg5Ov6uw7ptGJMqFJLm84mvHsTWrj",
      accounts: [
        "50f4e03f8d266354bcccb1f8a1f48eee25e944f16ae0d0d447cb93579d49e1d8"
      ]
    }
  }
};
