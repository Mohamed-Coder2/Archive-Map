'use client'

import React from "react";
import '../../app/globals.css'

export default function Top(props){
  return(
    <div className="flex justify-between align-middle">

      <div className={`absolute top-2 left-2 px-4 py-2 hover:cursor-pointer text-black bg-blue-500 rounded-md hover:bg-blue-600 transform transition-transform 
        ${props.isOpen ? ' translate-x-72' : ' translate-x-0'}`}
        onClick={props.handleClick}
      >{props.img}</div>
      <div></div>
      <div className="m-4 text-4xl text-center"><h2>{props.name}</h2></div>
      <div className="m-4 text-lg flex align-middle text-right">
        <p>EN</p>
        <label className="switch">
          <input 
            type="checkbox"
          />
          <span className="slider"></span>
        </label>
        <p>AR</p>
      </div>

    </div>
  )
}