require("dotenv").config();
// const rinkebyKey = process.env.REACT_APP_ALCHEMY_RINKEY;
const mainnetKey = process.env.REACT_APP_ALCHEMY_MAINNET;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(mainnetKey);

const contractABI = require("../contract-abi_new.json");
const contractAddress = "0xa3363F6C6737AE48DeD6f81ed111f91fCF4f6754";

export const DafeisContract = new web3.eth.Contract( contractABI, contractAddress );

export const loadTotalMintCount = async () => {
  var message = await DafeisContract.methods.totalMint().call();
  return message;
};

export const getCurrentMessage = async () => {
  var message = await DafeisContract.methods.message().call();
  return message;
};

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a  rel="noreferrer"  target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({ method: "eth_accounts", });
      if (addressArray.length > 0) {
        return { address: addressArray[0], status: "👆🏽 Write a message in the text-field above.", };
      } 
      else {
        return { address: "", status: "🦊 Connect to Metamask using the top right button.", };
      }
    } catch (err) {
      return { address: "", status: "😥 " + err.message, };
    }
  } 
  else {
    return { address: "", status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a  rel="noreferrer"  target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const updateMessage = async (address, message) => {
  //input error handling
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the message on the blockchain.",
    };
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    };
  }
  //set up transaction parameters
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: address, // must match user's active address.
    data: DafeisContract.methods.update(message).encodeABI(),
  };

  //sign the transaction
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      status: (
        <span>
          ✅{" "}
          <a  rel="noreferrer"  target="_blank" href={`https://rinkeby.etherscan.io/tx/${txHash}`}>
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
        </span>
      ),
    };
  } catch (error) {
    return {
      status: "😥 " + error.message,
    };
  }
};

export const mintDafeisCount = async (address, mintCount) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the message on the blockchain.",
    };
  }
  //set up transaction parameters
  console.log(mintCount);
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: address, // must match user's active address.
    value: web3.utils.toHex(web3.utils.toBN(`${33000000000000000*mintCount}`)),
    gasLimit: 62000,
    data: DafeisContract.methods
      .mint(address, mintCount)
      .encodeABI(),
  };
  console.log(transactionParameters.value);
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });

    return {
      status: (
        <span>
          ✅{" "}
          <a  rel="noreferrer"  target="_blank" href={`https://rinkeby.etherscan.io/tx/${txHash}`}>
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
        </span>
      ),
    };
  } catch (error) {
    console.log(error);
    return {
      status: "😥 " + error.message,
    };
  }  
}

export const Reserve = async (address, mintCount) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the message on the blockchain.",
    };
  }
  //set up transaction parameters
  console.log(mintCount);
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: address, // must match user's active address.
    data: DafeisContract.methods
      .reserve(mintCount)
      .encodeABI(),
  };

  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });

    return {
      status: (
        <span>
          ✅{" "}
          <a  rel="noreferrer"  target="_blank" href={`https://rinkeby.etherscan.io/tx/${txHash}`}>
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
        </span>
      ),
    };
  } catch (error) {
    console.log(error);
    return {
      status: "😥 " + error.message,
    };
  }  
}

export const Pause = async (address, flag) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the message on the blockchain.",
    };
  }
  //set up transaction parameters
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: address, // must match user's active address.
    data: DafeisContract.methods
      .pause(flag)
      .encodeABI(),
  };

  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });

    return {
      status: (
        <span>
          ✅{" "}
          <a  rel="noreferrer"  target="_blank" href={`https://rinkeby.etherscan.io/tx/${txHash}`}>
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
        </span>
      ),
    };
  } catch (error) {
    console.log(error);
    return {
      status: "😥 " + error.message,
    };
  }  
}

export const pauseMinting = async (address, value) => {
  //input error handling
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the message on the blockchain.",
    };
  }
  //set up transaction parameters
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: address, // must match user's active address.
    data: DafeisContract.methods
      .pause(value)
      .encodeABI(),
  };

  //sign the transaction
  try {
      await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });

    return {
      status: "Minting has been successfully paused"
    };
  } catch (error) {
    console.log(error);
    return {
      status: "😥 " + error.message,
    };
  }  
}

export const withdrawAll = async (address, mintCount) => {
  //input error handling
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the message on the blockchain.",
    };
  }
  //set up transaction parameters
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: address, // must match user's active address.
    data: DafeisContract.methods
      .mint(address, mintCount)
      .encodeABI(),
  };

  //sign the transaction
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });

    return {
      status: (
        <span>
          ✅{" "}
          <a  rel="noreferrer"  target="_blank" href={`https://rinkeby.etherscan.io/tx/${txHash}`}>
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
        </span>
      ),
    };
  } catch (error) {
    console.log(error);
    return {
      status: "😥 " + error.message,
    };
  }  
}
