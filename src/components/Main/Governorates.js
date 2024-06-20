"use client";

import React, { useState } from "react";
import Data from './governorates.json';
import { useRouter } from 'next/navigation';

const Governorates = (props) => {
  const [input, setInput] = useState('');
  const [filteredGovernorates, setFilteredGovernorates] = useState([]);
  const router = useRouter();

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setInput(value);

    const filtered = Data.filter(gov =>
      gov.governorate_name_en.toLowerCase().includes(value)
    );

    // Sorting: Governorates starting with the input letter should come first
    filtered.sort((a, b) => {
      if (a.governorate_name_en.toLowerCase().startsWith(value)) return -1;
      if (b.governorate_name_en.toLowerCase().startsWith(value)) return 1;
      return 0;
    });

    setFilteredGovernorates(filtered);
  };

  const handleClick = (name) => {
    router.push(`/dashboard?name=${encodeURIComponent(name)}`);
  };

  return (
    <div className="w-full h-1/3 flex flex-col items-center">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Search governorates"
        className="w-4/5 rounded-md pl-4"
      />
      {input && (
        <div className="max-h-32 bg-BYellow text-white w-4/5 bg-red-700 overflow-auto">
          <ul>
            {filteredGovernorates.map((gov) => (
              <li
                key={gov.id}
                className="hover:cursor-pointer pl-4"
                onClick={() => handleClick(gov.governorate_name_en)}
              >
                {gov.governorate_name_en}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Governorates;
