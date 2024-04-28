import React, { useEffect, useState } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import Display from './components/Display';
import { ethers } from 'ethers';
import Modal from './components/Modal';

// import Config from "./config.json";
// import GDRIVE from "./artifacts/contracts/Dgdrive.sol/Dgdrive.json"
import abi from "./Remix-de_abi.json"

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [connectWallet, setConnectWallet] = useState("Connect");




  const connectHandler = async () => {
    // Fetch accounts
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);
    setConnectWallet("Connected!");
  
    // Refresh account
    window.ethereum.on('accountsChanged', async () => {
      const updatedAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(updatedAccounts[0]);
    });
  
    loadBlockchainData();
  }
  
  const loadBlockchainData = async () => {
    try {
    
      // Load contract data
      let currentProvider = provider;
      if (!currentProvider) {
        currentProvider = new ethers.BrowserProvider(window.ethereum);
        setProvider(currentProvider);
      }
  
      const network = await currentProvider.getNetwork();
      console.log("Current Network is " + network.name);

      const signer = await currentProvider.getSigner();
      setSigner(signer)

      // const contractAddress = Config[1337].dgdrive.address;
      // const abi = GDRIVE.abi

      const contractAddress = "0x8697e708461De14D7aB3ffbB41D323870b25a0D9";

      const contractData = new ethers.Contract(contractAddress, abi, currentProvider);
      console.log("Token master contract", contractData)
      
      // Set Contract state
      setContract(contractData);

    } catch (error) {
      console.error("Error loading blockchain data:", error);
    }
  };

  // useEffect(() =>{
  //   connectHandler();
  // }, []);
  
  return (
    <div className="main">
  <div className="btnDiv">
    {account && (
        <button className="share" onClick={() => setModalOpen(true)}>Share</button>
      )} 
      {
        modalOpen && (
          <Modal setModalOpen={setModalOpen} contract={contract} signer={signer}/>
        )
      }

    {connectWallet && (
        <button className="connect" onClick={() => connectHandler()}>{connectWallet}</button>
    )} 
  </div>

    <div className='App'>
      <h1 style={{ color: 'white' }}>Decentralized Google Drive</h1>
      <div className='bg'></div>
      <div className='bg bg2'></div>
      <div className='bg bg3'></div>


      <p className="conText">
        Account: {account ? (account ) : (

        <span>Not connected</span>
        )}
      </p>
      <FileUpload 
        account={account} 
        provider={provider} 
        contract={contract} 
        signer={signer}
      />
      <Display 
        contract={contract} 
        account={account}
        signer={signer} 
      />
    </div>
    </div>
  );
}

export default App;