'use client';
import React, { useState } from 'react';
import { ArrowIcon } from '../icons/HomeIcons';

const CategoryBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="box-border flex justify-center items-center px-4 py-2
      border rounded-full bg-white text-sm text-gray-600
      hover:bg-gray-100 focus:ring-gray-300 transition
      whitespace-nowrap min-h-[38px]"
        onClick={toggleDropdown}
      >
        <ArrowIcon />
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg hidden group-hover:block z-50">
          <ul
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
            className="py-2 text-sm text-gray-600"
          >
            <li>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={closeDropdown}>
                Option 1
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={closeDropdown}>
                Option 2
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={closeDropdown}>
                Option 3
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryBar;
