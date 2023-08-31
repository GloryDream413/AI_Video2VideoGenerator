import React, { useEffect, useCallback, useState } from 'react';
import './dream.css';
import { useDropzone } from 'react-dropzone';
import axios from 'axios'
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from 'react-toastify';

const baseUrl = "http://65.21.162.227:7777/";

export const Dream = () => {
  useEffect(() => {
    
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles[0]);
    const file = acceptedFiles[0];
    const videoUrl = URL.createObjectURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const [bLoadingFlag, setLoadingFlag] = useState(false)

  const onGenerate = async () => {
    if(pictureRoute === '')
    {
      toast.error("Please upload image.");
      return;
    }

    if(prompt === '')
    {
      toast.error("Prompt is empty.");
      return;
    }
    setLoadingFlag(true);
    const response = await axios.post(
      baseUrl + 'getMaskimage',
      {
        image_original : pictureRoute
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    fetch(response.data.response.output) // Fetch the image data from the server
    .then((response) => response.blob()) // Get the image data as a Blob
    .then((blob) => {
      const image = new Image();
      const imageUrl = URL.createObjectURL(blob);

      image.onload = function () {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
        const dataUrl = canvas.toDataURL('image/png');
        setMaskRoute(dataUrl);
        URL.revokeObjectURL(imageUrl);
      };
      image.src = imageUrl; // Set the image source to the object URL
    })
    .catch((error) => {
      console.error('Failed to fetch image data:', error);
    });

    const response1 = await axios.post(
      baseUrl + 'getImage',
      {
        image_original : pictureRoute,
        prompt : prompt,
        image_mask : maskRoute
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    setNftRoute1(response1.data.response.output[0]);

    const response2 = await axios.post(
      baseUrl + 'getImage',
      {
        image_original : pictureRoute,
        prompt : prompt,
        image_mask : maskRoute
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    setNftRoute2(response2.data.response.output[0]);

    const response3 = await axios.post(
      baseUrl + 'getImage',
      {
        image_original : pictureRoute,
        prompt : prompt,
        image_mask : maskRoute
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    setNftRoute3(response3.data.response.output[0]);
    setLoadingFlag(false);
  };

  return (
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
          {(pictureRoute === '') &&
            <div className='Uploaded'></div>
          }
          {(pictureRoute !== '') &&
            <img src={pictureRoute} alt="ai" />
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
      <div className="gpt3__header-content">
        {(nftRoute1 !== '') &&
          <div className="result1">
            <img src={maskRoute} alt="ai" />
          </div>
        }

        {(nftRoute2 !== '') &&
          <div className="result1">
            <img src={nftRoute2} alt="ai" />
          </div>
        }

        {(nftRoute3 !== '') &&
          <div className="result1">
            <img src={nftRoute3} alt="ai" />
          </div>
        }
      </div>
    </div>
  );
};
export default Dream;