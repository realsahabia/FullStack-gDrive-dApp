import { useState } from "react";
import "./Display.css";

const Display = ({ contract, account }) => {
  const [displayValue, setDisplayValue] = useState("0");

  const getData = async () =>{
    let dataArray = await contract.display(account.address);
    console.log('data', dataArray)
  }
  
  return (
    <>
      <div className="image-list">data</div>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      <button className="center button" onClick={getData}>
        Get Data
      </button>
    </>
  );
};
export default Display;