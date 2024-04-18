// Alexander 

import React, { useState } from 'react';

interface DropdownMenuProps {
  category: string;
  options: string[];
  categoryHandler: (category: string) => void;


}

function SidebarMenu({ category, options, categoryHandler }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedOption, setFocusedOption] = useState("");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
    <button
      onClick={toggleMenu}
      className="cursor-pointer w-full py-2 text-left focus:outline-none hover:underline"
    >
      {category}
    </button>
    {isOpen && options && (
      <ul className="left-0 mt-1 w-full z-10">
        {options.map((option, tabIndex) => (
          <li
            key={option}
            onClick={() => categoryHandler(option)}
            className={`cursor-pointer py-2 px-4 ${focusedOption === option ? 'bg-gray-200' : ''} ${category === option ? 'font-bold' : ''}`}
        
          >
            {option}
          </li>
        ))}
      </ul>
    )}
  </div>
);
};

export default SidebarMenu;
