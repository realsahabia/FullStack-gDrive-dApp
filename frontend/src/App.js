import React, { useEffect, useState } from "react";
import './App.css';
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import { ethers } from "ethers";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const loadProvider = async () => {
      try {
        if (window.ethereum) {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.BrowserProvider(window.ethereum);
          setProvider(provider);

          // Get signer and account address
          const signer = await provider.getSigner();
          const accounts = await provider.listAccounts();
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }

          // Set up contract instance
          const abi = Upload.abi;
          const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
          const contract = new ethers.Contract(contractAddress, abi, signer);
          setContract(contract);

          // Listen for account changes
          window.ethereum.on("accountsChanged", (newAccounts) => {
            if (newAccounts.length > 0) {
              setAccount(newAccounts[0]);
            } else {
              setAccount(""); // No connected account
            }
          });
        } else {
          console.error("MetaMask is not installed or not properly configured.");
          alert("MetaMask is not installed or not properly configured. Please install MetaMask and try again.");
        }
      } catch (error) {
        console.error("Error loading provider:", error);
        alert(error.message || "An error occurred while loading the provider.");
      }
    };

    loadProvider();

    // Clean up listeners when component unmounts
    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners("accountsChanged");
      }
    };
  }, []);  

  return (
    <div className="App">
      <h1 style={{ color: "white" }}>Gdrive dApp</h1>
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>

      <p style={{ color: "white" }}>
        Account : {account ? account.address : "Not connected"}
      </p>
      <FileUpload
        account={account}
        provider={provider}
        contract={contract}
      />
      <Display
        contract={contract}
        account={account}
      />
    </div>
  );
}

export default App;