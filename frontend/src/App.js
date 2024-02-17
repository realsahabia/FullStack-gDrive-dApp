import {useEffect, useState} from "react";
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
            const provider = new ethers.BrowserProvider(window.ethereum);

            if (provider) {
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                setAccount(signer);
                // const address = await signer.getAddress();
                // console.log(`User's Address: ${address}`);

                const abi = Upload.abi; // Extract ABI from JSON file
                const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
                const contract = new ethers.Contract(contractAddress, abi, signer);
                console.log(contract);

                setContract(contract);
                setProvider(signer);
                
            } else {
                alert("Please install MetaMask");
            }
        } 

    provider && wallet();
}, []);


  return (
    <div className="App">
      <h1>Test file</h1>
    </div>
  )
}

export default App;
