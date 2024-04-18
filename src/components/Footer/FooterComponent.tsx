//Component by Gustavo 
// stulet av simon


import React from 'react';

const FooterComponent: React.FC = () => {
  return (
    <div className="bg-green-900">
      <footer className="container mx-auto py-4 px-4 flex justify-between items-center">
        <div className="text-white text-sm md:text-base">
          Stay connected with us:
          <div className="mt-2">
            <button className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2">
              Facebook
            </button>
            <button className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2">
              Twitter
            </button>
            <button className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Instagram
            </button>
          </div>
        </div>
        <div className="text-white text-xs md:text-sm">
          <ul>
            <li>E-mail: help@recipes.se</li>
            <li>Phone: +08-000 000 06</li>
            <li>Address: chillington, 7, Stockholm</li>
          </ul>
          <p>&copy; 2024 Recept.nu. All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default FooterComponent;