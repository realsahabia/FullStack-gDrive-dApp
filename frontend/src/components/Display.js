import React, { useState } from "react";
import "./Display.css";

const Display = ({ contract, account, signer }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const getData = async () => {
    const otherAddress = document.querySelector(".address").value || account;
    let result;

    try {
      result = await contract.connect(signer).displayData(otherAddress);
      if (!result || result.length === 0) {
        setData(null);
        setError('No images to display.');
        return;
      }

      const images = result.map((el, i) => (
        <a href={el} key={`a-${i}`} target="_blank" rel="noopener noreferrer">
          <img src={el} alt={`Img ${i+1}`} className="image-list"/>
        </a>
      ));
      setData(images);
      setError(""); // Reset error state
    } catch (error) {
      console.error("Error getting data:", error);
      setError('Failed to retrieve images.');
      setData(null);
    }
  };

  return (
    <>
      {error && <div className="error">{error}</div>}
      <div className="image-list">{data}</div>

      {account && (
        <>
          <input
            type="text"
            placeholder="Enter Address"
            className="address"
          />
          <button className="center button" onClick={getData}>
            View Data
          </button>
        </>
      )}
    </>
  );
};

export default Display;