import React, {useState} from "react";

import {
  makeStyles
} from '@material-ui/styles';


import {
  useTheme
} from '@material-ui/core/styles';

import {
  CssBaseline,
  Button,
  Typography,
  Paper,
  Box,
  Avatar,
  Grid,
  // IconButton,
  TextField,
  Slider
} from '@material-ui/core';
// import { Add, Remove } from "@material-ui/icons";

import Web3 from "web3";
import Web3Modal from "web3modal";

import Authereum from "authereum";
import WalletConnectProvider from "@walletconnect/web3-provider";

// import backgroundImg from "./assets/img/minthome2.jpg";
import backgroundImg from "./assets/img/minthome_final.jpg";


const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    minWidth: '100vw',
    // backgroundImage: `url(https://i.ibb.co/T4rnYqJ/colorful-vector-hand-drawn-doodle-2372240.jpg)`,
    background: `url(${backgroundImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    width: '400px',
    height: '500px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column'
  },
  box: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ul: {
    padding: 0
  },
  li: {
    display: 'inline-block',
    listStyleType: 'none',
    alignItems: 'center',
    margin: '0 20px',
  },
  button: {
    position: 'relative',
    background: 'rebeccapurple',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    border: '10px solid black',
    color: 'white',
    fontFamily: 'Verdana',
    fontWeight: 'bold',
    fontSize: '50px',
    cursor: 'pointer',
    padding: 0,
  }
}));

const LIMIT = 20;
// Mainnet
const ADDRESS = "0x9AaE182E9AA6594D05a30395ff49455e5fAD929B";

// Rinkeby Testnet
// const ADDRESS = "0xBF370885219DBF04ADc01776CbEDdb1b6D06F81f";

const ABI = [{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint256","name":"_maxNftSupply","type":"uint256"},{"internalType":"uint256","name":"saleStart","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"GKC_PROVENANCE","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_NFT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REVEAL_TIMESTAMP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"emergencySetStartingIndex","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"flipSaleState","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isSaleActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxNftPurchase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nftPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"reserve","type":"uint256"}],"name":"reserveNft","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"baseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"provenance","type":"string"}],"name":"setProvenance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newTimestamp","type":"uint256"}],"name":"setReveealTimestamp","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setStartingIndex","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startingIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startingIndexBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

function App() {
  const theme = useTheme();
  console.log("Theme", theme);
  const classes = useStyles(theme);
  const [loggedIn, setLoggedIn] = useState(false);
  const [accInfo, setAccInfo] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [active, setActive] = useState(true);
  const providerOptions = {
    metamask: {
      id: 'injected',
      name: 'MetaMask',
      type: 'injected',
      check: 'isMetaMask'
    },
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "866c1d6efc4f4b54a6156690c492314c" // required
      }
    },
    authereum: {
      package: Authereum // required
    }
  };

  const web3Modal = new Web3Modal({
    network: "rinkeby",
    disableInjectedProvider: false,
    cacheProvider: true,
    providerOptions
  });


  const getweb3 = async () => {
    const provider = await web3Modal.connect();
    // Subscribe to accounts change
    provider.on("accountsChanged", (accounts) => {
      console.log("accountsChanged", accounts);
    });

    // Subscribe to chainId change
    provider.on("chainChanged", (chainId) => {
      console.log("chainChanged". chainId);
    });

    // Subscribe to provider connection
    provider.on("connect", (info) => {
      console.log("connect", info);
    });

    // Subscribe to provider disconnection
    provider.on("disconnect", (error) => {
      console.log("disconnect", error);
    });
    const web3 = new Web3(provider);
    return web3;
  }

  async function connectWallet() {
    await getweb3().then((web3) => {
      // setMyWeb3(response);
      web3.eth.getAccounts().then(async (result) => {
        console.log(result[0]);
        setLoggedIn(true);
        setAccInfo(result[0]);
        await getweb3().then(async (web3) => {
          const contract = new web3.eth.Contract(ABI, ADDRESS);
          console.log("Contract", contract);
          const minted = await contract.methods.balanceOf(result[0]).call();
          console.log(result[0], "has minted", minted, "till now.");
          if (parseInt(quantity) === LIMIT) {
            setActive(false);
          }
        });
      });
    });
  };
  async function disconnectWallet() {
    await getweb3().then(async (web3) => {
      await web3Modal.clearCachedProvider();
      setLoggedIn(false);
      setAccInfo('');
    })

  };
  async function mint() {
    await getweb3().then(async (web3) => {
      console.log("Minting", quantity);
      const contract = new web3.eth.Contract(ABI, ADDRESS);
      console.log("Contract", contract);
      const minted = await contract.methods.balanceOf(accInfo).call();
      if(minted < 20 ) {
        await contract.methods.mint(parseInt(quantity)).send({from: accInfo, value: 0.02 * parseInt(quantity) * Math.pow(10,18)});
        if (parseInt(quantity) === LIMIT) {
          setActive(false);
        }
      }
    })
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} align="center">
          <li className={classes.li}>
            <button className={classes.button}><img src="https://i.ibb.co/m6mT8pN/3.png" alt="3" border="0" width="240"/></button>
          </li>
        </Grid>
        <Grid item xs={12} md={6} align="center">
          <li className={classes.li}>
            <button className={classes.button}><img src="https://i.ibb.co/WcR6BXW/14.png" alt="14" border="0" width="240" align="top"/></button>
          </li>
        </Grid>
        <Grid item xs={12} align="center">
          <li className={classes.li}>
            <button className={classes.button}><img src="https://i.ibb.co/5YKhZjk/2.png" alt="2" border="0" width="240"/></button>
          </li>
        </Grid>
        <Grid item xs={12} align="center">
          <Paper className={classes.paper}>
            <Typography variant='h3'>
              Gamba Mint
            </Typography>
            {
              loggedIn &&
              <>
              <Avatar />
              <Typography variant='h5'>
                {accInfo.slice(0,10)}...
              </Typography>
              </>
            }
            <Box className={classes.box}>
              <Button variant='contained' onClick={connectWallet} disabled={loggedIn}>
                Connect
              </Button>
              <Button variant='outlined' onClick={disconnectWallet} disabled={!loggedIn}>
                Disconnect
              </Button>
            </Box>

            {/* <Box className={classes.box}>
              <IconButton variant="contained" color="primary" disabled={!loggedIn} onClick={() => quantity < 50 ? setQuantity(quantity + 1) : 50}>
                <Add />
              </IconButton>
              <Button variant="outlined" color="primary" onClick={() => setQuantity(5)}>
                5
              </Button>
              <Button variant="outlined" color="primary" onClick={() => setQuantity(10)}>
                10
              </Button>
              <Button variant="outlined" color="primary" onClick={() => setQuantity(15)}>
                15
              </Button>
              <Button variant="outlined" color="primary" onClick={() => setQuantity(20)}>
                20
              </Button>
            </Box> */}
            <Box sx={{ width: 300 }}>
              <Slider
              aria-label="NFTs to Mint"
              defaultValue={1}
              getAriaValueText={(value) => parseInt(value)}
              step={1}
              marks
              min={1}
              max={20}
              valueLabelDisplay="on"
              onChange={(e, n) => setQuantity(n)}
              disabled={!loggedIn}
              />
            </Box>
            {/* <Box className={classes.box}>
              <TextField fullWidth value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </Box> */}
            {
              !active &&
              <Typography color="secondary">You have already minted 20!</Typography>
            }
            <Button variant='contained' color='secondary' onClick={mint} disabled={!loggedIn || !active}>
              Mint
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
