"use client";

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import data from '../../Data.json';

const Dashboard = () => {
  const searchParams = useSearchParams();
  const nameParam = searchParams.get('name');
  const [filter, setFilter] = useState('All'); // State to manage the current filter
  const [governorate, setGovernorate] = useState(nameParam || ''); // State to manage the governorate input
  const [activeButton, setActiveButton] = useState('All');

  // Function to handle button click
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setActiveButton(newFilter); // Set the active button
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    setGovernorate(e.target.value);
  };

  // Filter the data based on the current filter and governorate
  const filteredData = data.filter(item => {
    const matchesType = filter === 'All' || item.type === filter;
    const matchesGovernorate = !governorate || item.governorate.toLowerCase().includes(governorate.toLowerCase());
    return matchesType && matchesGovernorate;
  });

  return (
    <div className='w-full h-screen bg-white flex flex-col items-center align-middle'>
      
      <div className=' bg-white w-4/5 h-1/5 flex justify-between'>
        
      <div className='w-2/4 flex justify-evenly items-center'>
      <div className="buttons">
        <button 
          className={`btn ${activeButton === 'All' ? 'active' : ''}`} 
          onClick={() => handleFilterChange('All')}
        >
          <span></span>
          <p data-start="good luck!" data-text="==>" data-title="All"></p>
        </button>
        <button 
          className={`btn ${activeButton === 'Video' ? 'active' : ''}`} 
          onClick={() => handleFilterChange('Video')}
        >
          <span></span>
          <p data-start="good luck!" data-text="==>" data-title="Video"></p>
        </button>
        <button 
          className={`btn ${activeButton === 'Audio' ? 'active' : ''}`} 
          onClick={() => handleFilterChange('Audio')}
        >
          <span></span>
          <p data-start="good luck!" data-text="==>" data-title="Audio"></p>
        </button>
      </div>
    </div>

        <div className='w-1/3 flex justify-evenly items-center'>
          <div>
            <input 
              type='text'
              placeholder='Governorate'
              value={governorate}
              onChange={handleInputChange}
              className='input'
            />
          </div>
        </div>
      </div>

      <div className='bg-white w-4/5 h-4/5 grid grid-cols-3 gap-16 overflow-auto'>
        {filteredData.map((item, index) => (
          <div key={index} className='item'>
            <a href={item.link}><img src={item.img} alt={item.Name} className='w-full h-auto'/></a>
            <div className='w-full flex justify-between'>
              <h3>{item.Name}</h3>
              <h5>{item.type}</h5>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Dashboard;
