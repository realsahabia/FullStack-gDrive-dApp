import React, { useState } from "react";
import "./Display.css";

const Display = ({ contract, account }) => {
  // const [displayValue, setDisplayValue] = useState("No data");
  const [data, setData] = useState("");


  const getData = async () => {

  let result; 
  const otherAddress = document.querySelector(".address").value;
      
  try {
    if (otherAddress){
      result = await contract.displayData(otherAddress);
    } else {
      result = await contract.displayData(account);
    }
  } catch (error) {
    console.error("Error getting data:", error);
    // Handle error (e.g., show error message)
  }

  const isEmpty = Object.keys(result).length === 0;
  
  if (!isEmpty) {
    const images = result.map((el, i) => {
      return (
        <a href={el} key={`a-${i}`} target="_blank" rel="noopener noreferrer">
          <img key={`img-${i}`} src={el} alt={`Img ${i+1}`}  className="image-list"/>
        </a> 
      )
    })
    setData(images)
  }  else {
    setData('No Images to display')
  }

  };

  return (
    <>
      <div className="image-list">{data}</div>
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
