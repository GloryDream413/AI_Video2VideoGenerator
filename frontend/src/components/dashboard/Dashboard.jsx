import React from 'react';
import './dashboard.css';
import aiorigin from '../../assets/aiorigin.png'
import aigenerated from '../../assets/aigenerated.png'
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  return (
    <div className="gpt3__header section__padding" id="home">
      <div className='generate'>
        <h1><b>Generating dream Video <span>using AI</span> for everyone.</b></h1>
      </div>
      <div className='generate'>
        <button type="button" ><Link to="/dream">Generate your dream Video</Link></button>
      </div>
      <div className="gpt3__header-content">
        <div className="original">
          <h2>Original Video</h2>
          <img src={aiorigin} alt="ai" />
        </div>
        <div className="generated">
          <h2>Generated Video</h2>
          <img src={aigenerated} alt="ai" />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;