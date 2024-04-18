// Alexander

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useRecipeState from "../../../State/indexState";
import NavBarComponent from "../../NavBarComponent";
import DrinkSidebarMenu from "./DrinksSidebar";


function PresentCocktails() {
  const getCategoryDrinks = useRecipeState(
    (state) => state.fetchSpecificDrinkIngredient
  );
  const categoryDrinks = useRecipeState((state) => state.categoryDrinks);
  const [handleCategory, setHandleCategory] = useState("Gin"); // Default category
  const [dropdownMenus, setDropdownMenus] = useState([
    {
      category: "Alcoholic Drinks",
      options: [
        "Gin",
        "Vodka",
        "Tequila",
        "Light rum",
        "Dark rum",
        "Champagne",
        "Whiskey",
      ],
    },
    // Add other categories as needed
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSpecificCategory(handleCategory);
  }, [handleCategory]);

  const fetchSpecificCategory = async (category: string) => {
    try {
      await getCategoryDrinks(category.toLowerCase());
    } catch (error) {
      console.log("Error fetching category drinks:", error);
    }
  };

  const categoryHandler = (inputCategory: string) => {
    setHandleCategory(inputCategory);
    closeSidebar(); // Close sidebar after selecting a category
  };

  const navigateCocktailId = (id: string) => {
    navigate(`/cocktails/${id}`);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div>
    <NavBarComponent />
    <div className="flex">
     
      <div className="w-1/4">
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2 pt-5">Categories</h3>
          {dropdownMenus.map(({ category, options }) => (
            <DrinkSidebarMenu
              key={category}
              category={category}
              options={options}
              categoryHandler={categoryHandler}
            />
          ))}
        </div>
      </div>
      <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-4 2xl:w-3/5 2xl:m-12 2xl:pt-10">
        {categoryDrinks &&
          categoryDrinks.map((drink) => (
            <div
              key={drink.idDrink}
              className="rounded overflow-hidden shadow-lg cursor-pointer mb-4"
              onClick={() => navigateCocktailId(drink.idDrink)}
            >
              <img
                src={drink.strDrinkThumb}
                alt={drink.strDrink}
                className="w-full h-64 object-cover"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-lg mb-2">
                  {drink.strDrink}
                </div>
                <p className="text-gray-600 text-sm">
                  {/* Add rating here */}
                </p>
              </div>
            </div>
          ))}
      </div>
     
    </div>
    </div>
  );
}

export default PresentCocktails;

