import { useState } from 'react';
import axios from "axios";
import './FileUpload.css';

export default function FileUpload({ contract, account }) {
  const [fileInput, setFileInput] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (fileInput) {
      try {
        const formData = new FormData();
        formData.append("file", fileInput);

        const resFile = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData,
          {
            headers: {
              pinata_api_key: `3d1287d8f89411e76199`,
              pinata_secret_api_key: `c774939cfc8d192ece45edc077a111dd9400b8786740643217df32ac8e41f4f8`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const imgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        await contract.add(account, imgHash); // Make sure to await contract.add
        alert("Image uploaded successfully!");
        setUploadedFileName("No image selected");
        setFileInput(null);
        setError(null); // Clear any previous error
      } catch (err) {
        console.error(`Error uploading the file: ${err}`);
        setError("An error occurred while uploading the file. Please try again."); // Set error message
      }
    }
  };

  const retrieveFile = (event) => {
    const data = event.target.files[0];
    setFileInput(data);
    setUploadedFileName(data.name); // save the uploaded file name
    event.preventDefault(); // prevent page refresh on form submit
  };

  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
          disabled = {!account}
        />
        <span className="textArea">Image: {uploadedFileName}</span>
        {error && <p className="error">{error}</p>} {/* Display error message */}
        <button type="submit" className="upload" disabled = {!fileInput}>
          Upload File
        </button>
      </form>
    </div>
  );
}