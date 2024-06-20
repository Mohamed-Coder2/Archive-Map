'use client'

import React from "react";

import Governorates from "./Governorates";

const Side = (props) => {
  return(
    <>
      <div 
        className={`text-black fixed inset-y-0 left-0 w-1/5 bg-blue-900 bg-opacity-20 backdrop-blur-lg drop-shadow-lgnpm start shadow-lg transform transition-transform ${
                  props.isOpen ? 'translate-x-0' : '-translate-x-full'
                  }`}
        >
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-between w-full h-4/5">
            <div className="w-full h-4/5">
              <div className="w-full flex items-center justify-center"><h3 className="border-b-4 w-3/5 text-center text-3xl">Location</h3></div>
              <div className="w-full h-full flex justify-center items-center bg-yellow-400">
                <Governorates 
                  setName = {props.setName}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Side;