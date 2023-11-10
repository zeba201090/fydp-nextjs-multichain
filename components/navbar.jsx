import React from "react";
import Link from "next/link";

const Navbar = () => {

    return(
        <div className="bg-blue-500  text-white	 flex flex-col items-center">
        <h1 className=" w-full ">navbar</h1>
        <div className="flex">
          <Link href="/MedicalRecordEntry">
            <p className=" w-full text-center p-4 font-bold ">EHR Entry Form</p>
          </Link>
          <Link href="/PatientHistory">
            <p className=" w-full  text-center p-4 font-bold">Search patient history</p>
          </Link>
        </div>
      </div>
      
    );
};

export default Navbar;