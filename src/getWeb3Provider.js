import WalletConnectProvider from "@walletconnect/web3-provider";
import Authereum from "authereum";
import Web3 from "web3";
import Web3Modal from "web3modal";

const getWeb3Provider = () => {
  console.log("inside web3controller");
  const providerOptions = {
    /* See Provider Options Section */
    metamask: {
        id: 'injected',
        name: 'MetaMask',
        type: 'injected',
        check: 'isMetaMask'
    },
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "866c1d6efc4f4b54a6156690c492314c", // required
      },
    },
    authereum: {
        package: Authereum // required
    },
  };

  const subscribeProvider = async (provider) => {
    if (!provider.on) {
      return;
    }
    provider.on("close", () => this.resetgetWeb3Provider());
    provider.on("accountsChanged", async (accounts) => {
      console.log("inside subscribeProvider");
    });
    provider.on("chainChanged", async (chainId) => {
      console.log("inside subscribeProvider");
    });
    provider.on("networkChanged", async (networkId) => {
      console.log("inside subscribeProvider");
    });
  };

  const web3Modal = new Web3Modal({
    network: "rinkeby", // optional
    cacheProvider: false, // optional
    disableInjectedProvider: false,
    providerOptions, // required
  });

  const onConnect = async () => {
    const provider = await web3Modal.connect();
    console.log("web3Modal.connect() provider: ", provider);
    const web3 = new Web3(provider);
    console.log("web3: ", web3);
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    const networkId = await web3.eth.net.getId();
    console.log("address: ", address, " netowrkID: ", networkId);
    await subscribeProvider(provider);
    return provider;
  };
  const web3Provider = onConnect();
  return web3Provider;
};
export default getWeb3Provider;

