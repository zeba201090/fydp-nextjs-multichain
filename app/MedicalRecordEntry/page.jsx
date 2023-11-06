'use client';

import React from 'react';

import { useState } from 'react';
import Navbar from '/components/navbar.jsx';
import publishToMultiChain from '/blockchain/publishData.js'




const MedicalRecordEntry = () => {

    
    const streamName = 'stream1';
    const key = 'key1';
    const NID ='58556802';
    const Name='John Doe';
    const Age='25';
    const [symptoms, setSymptoms] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [medicine, setMedicine] = useState('');
    const [tests, setTests] = useState('');
    const [comments, setComments] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async () => {
       
    
        const data = {
          NID: '58556802',
          Name: 'John Doe',
          Age: '25',
          symptoms,
          diagnosis,
          medicine,
          tests,
          comments,
        };
    
        try {
          // const result = await fetch('http://localhost:8000');
          const result = await fetch('http://localhost:8000/post', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
          
          if (result) {
            alert('Successfully published to MultiChain');
            console.log('Published to MultiChain:',data );


          }


          } catch (error) {
            
            console.error('Failed to publish:', error);
          }
      
            
    
        setSymptoms('');
        setDiagnosis('');
        setMedicine('');
        setTests('');
        setComments('');
      };
    

  return (
    <div>
    <Navbar />
    <div className="flex justify-center items-center h-auto border-m mt-10">
      <div className="bg-blue-200 w-4/5 h-auto rounded-lg shadow-xl p-5">
        <label className="text-2xl font-bold text-center items-center">Medical Record Entry</label>
        <div className="flex justify-center items-center">
          <label className="text-l font-bold px-5 my-7">Patient ID :</label>
          <input className="border-2 border-blue-300 rounded-lg w-1/2 h-10 p-5" type="text" placeholder="Patient ID" />
        </div>
        <div className="flex flex-row justify-center h-auto m-2 border-2 rounded-md">

          <div className="bg-blue-100 float-left w-1/4 py-4 px-4">
            <label className="text-l font-bold text-blue-900 my-7 ">Patient General Info</label>
            <p>Patient Name: John Doe</p>
            <p>Patient Age: 25</p>
          </div>

          <div className="bg-white float-left w-3/4 py-4 px-4">
            <label className="text-l font-bold justify-center text-blue-900 px-80">EHR Entry</label>
            <div className="pt-5 pb-3">
              <label className="text-l font-bold px-2 ">Symptoms:</label>
              <input
                className="border-2 border-gray-300 rounded-lg w-full p-2"
                type="text"
                placeholder="Enter symptoms" onChange = { (e)=> { setSymptoms(e.target.value) }}
              />
            </div>

            <div className="py-2">
              <label className="text-l font-bold px-2 ">Diagnosis:</label>
              <textarea
                className="border-2 border-gray-300 rounded-lg w-full p-2"
                placeholder="Enter diagnosis" onChange={ (e) => { setDiagnosis(e.target.value)}}
              />
            </div>
            <div className="py-2">
              <label className="text-l font-bold px-2  ">Medicine:</label>
              <input
                className="border-2 border-gray-300 rounded-lg w-full p-2"
                type="text"
                placeholder="Enter prescribed medicine" onChange={(e) => { setMedicine(e.target.value) }}
              />
            </div>
            <div className="py-4">
              <label className="text-l font-bold px-2 ">Tests:</label>
              <input
                className="border-2 border-gray-300 rounded-lg w-full p-2 "
                type="text"
                placeholder="Enter suggested tests" onChange={(e) => {  setTests(e.target.value) }}
              />
            </div>
            <div className="py-2">
              <label className="text-l font-bold px-2 ">Comments:</label>
              <textarea
                className="border-2 border-gray-300 rounded-lg w-full p-2"
                placeholder="Enter comments" onChange={(e) => { setComments(e.target.value) }}
              />
              </div>
              <div> 
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded float-right" onClick={handleSubmit}>
                    Submit 
                    </button>
                    </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
)};


export default MedicalRecordEntry;
