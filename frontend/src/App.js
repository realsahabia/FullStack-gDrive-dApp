import { useEffect, useState } from "react";
import './App.css';
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const wallet = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
    
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
    
        const address = await signer.getAddress();
        console.log(`User's Address: ${address}`);
        setAccount(address);
    
        const abi = Upload.abi; // Extract ABI from JSON file
        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        const contract = new ethers.Contract(contractAddress, abi, signer);
        console.log(contract);
    
        setContract(contract);
        setProvider(signer);
      } catch (error) {
        console.error("Error in wallet:", error);
        alert(error.message || "An error occurred. Please try again.");
      }
    };
    

    wallet();
  }, [provider]); // Include provider in the dependency array

  return (
    <div className="App">
      <h1 style={{ color: "white" }}>Gdrive 3.0</h1>
      <div className="bg"></div>
      {/* <div className="bg bg2"></div> */}
      {/* <div className="bg bg3"></div> */}

      <p style={{ color: "white" }}>
        Account : {account ? account : "Not connected"}
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
