import React, { useEffect, useState } from "react";
import './App.css';
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import { ethers } from "ethers";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const loadProvider = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.BrowserProvider(window.ethereum);
          setProvider(provider);

          // Get signer and account address
          const signer = provider.getSigner();
          const accounts = await provider.listAccounts();
          console.log(accounts[0]);
          setAccount(accounts[0]);

          // Set up contract instance
          const abi = Upload.abi;
          const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
          const contract = new ethers.Contract(contractAddress, abi, signer);
          setContract(contract);
        } catch (error) {
          console.error("Error loading provider:", error);
          alert(error.message || "An error occurred while loading the provider.");
        }
      } else {
        console.error("MetaMask is not installed or not properly configured.");
        alert("MetaMask is not installed or not properly configured. Please install MetaMask and try again.");
      }
    };

    loadProvider();
  }, []);  

  return (
    <div className="App">
      <h1 style={{ color: "white" }}>Gdrive 3.0</h1>
      <div className="bg"></div>
      {/* <div className="bg bg2"></div> */}
      {/* <div className="bg bg3"></div> */}

      <p style={{ color: "white" }}>
        Account : {account ? account.address : "Not connected"}
      </p>
      <FileUpload
        account={account}
        provider={provider}
        contract={contract}
      ></FileUpload>
      <Display
        contract={contract}
        account={account}>
      </Display>
    </div>
  )
}

export default App;
