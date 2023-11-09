'use client';

import React from 'react';

import { useState } from 'react';
import Navbar from '/components/navbar.jsx';




const PatientHistory = () => {
  
  const [data, setData] = useState([]);
  const [NID, setNID] = useState('');
  const [loading, setLoading] = useState(false);
  
  async function MedicalHistory () {
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:8000/get');
      if (response.ok) {
        const patientData = await response.json();
        const extractedData = patientData.map(item => item.data.json);

        console.log(extractedData);
       
        setData(extractedData);
        console.log(data);
      } else {
        console.log(response)
        console.log(typeof(response))
        console.error('Failed to fetch patient data');
      }
    } catch (error) {
     
      console.error('Fetch error:', error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      
    }
    setNID(''); 
  }

  return (
    <div>
      <Navbar />

      <div className="bg-white flex justify-center items-center h-auto border-m mt-10">
        
        <label className="p-5 text-xl font-bold">
          Enter NID no. of patient:
        </label>
        <input
          className="bg-blue-100 border-2 h-14 rounded-xl justify-center px-6"
          onChange={(e) => {
            setNID(e.target.value);
          }}
          type="text"
          placeholder="NID no."
          value={NID}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded "
          onClick={MedicalHistory}
        >
          Search
        </button>
      </div>

      <div className="w-3/4 mx-auto h-3/4 border-m rounded-m flex row justify-center items-center">
  {loading ? (
    <div className="text-center p-4">Loading...</div>
  ) : data.length > 0 ? (
    <div className="bg-blue-200 flex flex-row  p-8 border-m my-10 w-3/4 rounded-xl">
      <div className="p-4">
        <h2 className="text-xl font-bold">Patient Information</h2>
        {data.map((item) => (
          <div className='bg-blue-100 h-auto w-auto m-4 p-4 rounded-md'>
        <p>date: 2/11/23 </p>
        <p key={item.NID}> Diagnosis{item.diagnosis}</p>
          
          </div>
         ))}

      </div>
    </div>
  ) : null}
</div>
</div>
  );
};


export default PatientHistory;
