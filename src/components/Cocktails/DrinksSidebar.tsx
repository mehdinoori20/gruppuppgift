// Alexander

import React, { useState } from 'react';

interface DropdownMenuProps {
  category: string;
  options: string[];
  categoryHandler: (category: string) => void;
}

function DrinkSidebarMenu({ category, options, categoryHandler }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        onClick={toggleMenu}
        className="cursor-pointer w-full py-2 text-left focus:outline-none"
      >
        {category}
      </button>
      {isOpen && options && (
        <ul className="left-0 mt-1 w-full z-10">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => categoryHandler(option)}
              className={`cursor-pointer py-2 px-4 ${
                category === option ? 'font-bold' : ''
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DrinkSidebarMenu;
