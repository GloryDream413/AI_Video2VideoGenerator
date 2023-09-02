import React, { useCallback, useState } from 'react';
import './dream.css';
import { useDropzone } from 'react-dropzone';
import axios from 'axios'
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from 'react-toastify';
const baseUrl = "http://65.21.162.227:7777/";

export const Dream = () => {
  const [ videoUrl, SetVideoURL ] = useState('');
  const [ videoURI, SetVideoURI ] = useState('');
  const [ output, SetOutput ] = useState('');
  const onGenerate = async () => {
    const response = await axios.post(
      baseUrl + 'getImage',
      {
        infile : videoURI,
        frame_rate : 30,
        horizontal_resolution : 480
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    SetOutput(response.data.response.output);
    document.getElementById('myModal').style.display = 'block';
  }

  function closeModal() {
    document.getElementById('myModal').style.display = 'none';
  }
  
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const videoUrl = URL.createObjectURL(file);
    SetVideoURL(videoUrl);
    
    const reader = new FileReader();
    reader.onload = function (loadEvent) {
      const fileData = loadEvent.target.result;
      const dataURI = 'data:' + file.type + ';base64,' + btoa(fileData);
      SetVideoURI(dataURI);
    };
    reader.readAsBinaryString(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const [bLoadingFlag, setLoadingFlag] = useState(false)
 
  return (
    <div>
      <div id="myModal" className="modal">
          <div className="modal-content">
              <span className="close" id="closeModalBtn" onClick={closeModal}>&times;</span>
              {(output !== '') &&
                <video width="100%" height="100%" controls >
                  <source src={output} type="video/mp4"/>
                </video>
              }
          </div>
      </div>
      <div className="gpt3__header section__padding" id="home">
        <div className='generate'>
          <h1><b>Generating dream Video <span>using AI</span> for everyone.</b></h1>
        </div>
        <div className='generate'>
          <button type="button" onClick={onGenerate}>Generate your dream Video</button>
        </div>
        <div className="gpt3__header-content">
          <div className="original">
            <h2>Upload Video (*.mp4)</h2>
            <div className="upload-container">
              <div {...getRootProps()} className={`box-container ${isDragActive ? 'active' : ''}`}>
                <input {...getInputProps()} />
                <p>{isDragActive ? 'Drop the file here' : 'Drag and drop file here'}</p>
              </div>
            </div>
          </div>
          <div className="generated">
            <h2>Uploaded Video</h2>
            {(videoUrl === '') &&
              <div className='Uploaded'></div>
            }
            {(videoUrl !== '') &&
              <video width="100%" height="100%" controls >
                <source src={videoUrl} type="video/mp4"/>
              </video>
            }
            <div className="spinner-wrapper">
              {(bLoadingFlag === true) &&
                < ClipLoader
                  color='#ffffff'
                  loading={true}
                  cssOverride={true}
                  size={50}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dream;