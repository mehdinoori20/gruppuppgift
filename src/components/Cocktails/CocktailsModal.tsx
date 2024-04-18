// alexander 

import { useEffect, useState } from "react";

interface CocktailsModalProps {
  isOpen: boolean;
  closeModal: () => void;
  categoryDrinks: any[];
  navigate: (url: string) => void;
  category: string;
}

function CocktailsModal({ isOpen, closeModal, categoryDrinks, navigate,category,}: CocktailsModalProps) {
  const [currentPage, setCurrentPage] = useState(1); // pagination
  const itemsPerPage = 12;
  const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage;
  const currentItems = categoryDrinks.slice(firstItem, lastItem);

  const page = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {  // closes modal when escape is hit
    const modalEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", modalEscape);
    }

    return () => {
      window.removeEventListener("keydown", modalEscape);
      setCurrentPage(1); // used to reset pagination when closed <- reseting useState
    };
  }, [isOpen, closeModal]);

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${isOpen ? "" : "hidden"}`}
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between">
              <p className="text-3xl font-bold">{category}</p>
              {categoryDrinks.length > itemsPerPage && (
                <nav
                  className="relative z-0 inline-flex shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  {Array.from(
                    { length: Math.ceil(categoryDrinks.length / itemsPerPage) },
                    (_, index) => (
                      <button
                        key={index}
                        onClick={() => page(index + 1)}
                        className={`whitespace-nowrap relative inline-flex items-center px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-blue-50 ${
                          currentPage === index + 1
                            ? "bg-gray-100"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {index + 1}
                      </button>
                    )
                  )}
                </nav>
              )}
                <button
              onClick={closeModal}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
            </div>
          
          </div>
          <div className="sm:flex ">
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              {currentItems.map((drink) => (
                <div
                  key={drink.idDrink}
                  onClick={() => navigate(`/cocktails/${drink.idDrink}`)}
                  className="mx-0.5"
                  onKeyDown={(e) => {
                    if (e.key === 'Tab' && !e.shiftKey) {
                      // Move focus to the next card element
      
                    }
      
                    if (e.key === "Enter" && !e.shiftKey) {
                      navigate(`/cocktails/${drink.idDrink}`)
                    }
                  }}
      
                  tabIndex={0} 
                >
                  <div className="rounded overflow-hidden shadow-lg h-54">
                    <div className="max-w-3xl">
                      <div>
                        <img
                          src={drink.strDrinkThumb}
                          alt={drink.strDrink}
                          style={{
                            height: "170px",
                            width: "95%",
                            objectFit: "cover",
                          }}
                          className="transition duration-200 hover:scale-110 sm:w-72 h-54 object-contain"
                        />
                      </div>
                    </div>
                    <div className="px-2 py-3">
                      <div className="flex justify-between">
                        <div className="font-bold text-lg mb-2">
                          {drink.strDrink.split(" ").length >= 4
                            ? drink.strDrink
                                .split(" ")
                                .slice(0, 3)
                                .join(" ")
                                .concat("...")
                            : drink.strDrink}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          onClick={closeModal}
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default CocktailsModal;
