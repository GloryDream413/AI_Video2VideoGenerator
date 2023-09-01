import React, { useEffect, useCallback, useState } from 'react';
import './dream.css';
import { useDropzone } from 'react-dropzone';
import axios from 'axios'
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from 'react-toastify';
const baseUrl = "http://65.21.162.227:7777/";

export const Dream = () => {
  const [ videoUrl, SetVideoURL ] = useState('');
  useEffect(() => {
    
  }, []);

  const modal = document.getElementById('myModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  closeModalBtn.addEventListener('click', closeModal);

  const onGenerate = () => {
    modal.style.display = 'block';
  }

  function closeModal() {
    modal.style.display = 'none';
  }
  
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles[0]);
    const file = acceptedFiles[0];
    const videoUrl = URL.createObjectURL(file);
    SetVideoURL(videoUrl);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const [bLoadingFlag, setLoadingFlag] = useState(false)
 
  return (
    <div>
      <div id="myModal" class="modal">
          <div class="modal-content">
              <span class="close" id="closeModalBtn">&times;</span>
              <video width="100%" height="100%" controls >
                <source src={videoUrl} type="video/mp4"/>
              </video>
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