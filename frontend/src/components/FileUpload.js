import {useState, useEffect} from 'react';
import axios from "axios";
import './FileUpload.css'

export default function FileUpload({contract, account}) {
    const [fileInput, setFileInput] = useState(null);
    const [uploadedFileName, setUploadedFileName] = useState("");
  
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(fileInput){
            try {
                const formData = new FormData();
                formData.append("file", fileInput) 

                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                      pinata_api_key: `3d1287d8f89411e76199`,
                      pinata_secret_api_key: `c774939cfc8d192ece45edc077a111dd9400b8786740643217df32ac8e41f4f8`,
                      "Content-Type": "multipart/form-data",
                    },
                  });

                const imgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;

            } catch(error){
                alert(error);
            }
        }
    }

    const retrieveFile = (event) =>{
        const data = event.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);   // read file contents as an ArrayBuffer
        reader.onloadend = () => {
            setFileInput(event.target.files[0]);
        }

        setUploadedFileName(data.name);  // save the uploaded file name
        event.preventDefault()           // prevent page refresh on form submit
    }

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
        />
        <span className="textArea">Image: Nothing</span>
        <button type="submit" className="upload">
          Upload File
        </button>
      </form>
    </div>
  )
}
