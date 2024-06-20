'use client'

import React from "react";
import EgyptMap from "./Map";
import Side from "../../components/Main/Side";
import Top from "../../components/Main/Top";

import '../../app/globals.css'

export default function Home() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [name, setName] = React.useState('')

  const menu = (
    <React.Fragment>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-list hover:cursor-pointer" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
      </svg>
    </React.Fragment>
  );

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" w-full h-screen">
      <Top 
        isOpen = {isOpen}
        handleClick = {toggleIsOpen}
        img = {menu}
        name = {name}
      />
      <Side
        isOpen = {isOpen}
        setName = {setName}
      />
      <div className='w-full h-screen flex justify-end'>
        <EgyptMap 
          isOpen = {isOpen}
          name = {name}
          setName = {setName}
        />
      </div>
    </div>
  );
};
