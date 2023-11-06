'use client';

import React from 'react';

import { useState } from 'react';
import Navbar from '/components/navbar.jsx';

import searchData from '/blockchain/searchData'; 



const PatientHistory = () => {
  
  const [data, setData] = useState({});
  const [NID, setNID] = useState('');
  const [loading, setLoading] = useState(false);
  
  async function MedicalHistory () {
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:3000/MedicalRecordEntry');
      if (response.ok) {
        const patientData = await response.json();
        console.log(patientData);
        // const dataa= JSON.parse(patientData);
        // console.log(dataa);
        // console.log(pdata);
        setData(patientData);
        console.log(data);
      } else {
        console.log(response)
        console.log(typeof(response))
        console.error('Failed to fetch patient data');
      }
    } catch (error) {
     
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
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

      <div className= "w-3/4 mx-auto h-3/4 border-m rounded-m flex justify-center items-center">
        
     

      {loading ? (
  <div className="text-center p-4">Loading...</div>
) : data.Name && data.Age ? (
  <div className="bg-blue-200 flex justify-center items-center p-16 border-m my-10 w-1/2 rounded-xl">
    <div className="p-4">
      <h2 className="text-xl font-bold">Patient Information</h2>
      <p>
        <strong>First Name:</strong> {data.Name}
      </p>
      <p>
        <strong>Last Name:</strong> {data.Age}
      </p>
      <p>
        <strong>Age:</strong> {data.symptoms}
      </p>
      {/* <p>
        <strong>Gender:</strong> {data.gender}
      </p> */}
      <p>
        <strong>NID:</strong> {data.NID}
      </p>
      {/* <p>
        <strong>Mobile:</strong> {data.mobile}
      </p> */}
    </div>
  </div>
) : null}
     </div>
    </div>
  );
};


export default PatientHistory;
