//Alexander

import React, { useEffect, useState } from "react";
import useRecipeState from "../State/indexState";
import NavBarComponent from "../components/NavBarComponent";
import { FaAngleDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import FooterComponent from "../components/Footer/FooterComponent";
import '../../Styling/Cocktail.css'

function PresentCocktails() {
  const getCategoryDrinks = useRecipeState((state) => state.fetchSpecificDrinkIngredient);
  const categoryDrinks = useRecipeState((state) => state.categoryDrinks)
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Gin");
  const navigate = useNavigate();



  useEffect(() => {
    fetchSpecificCategory(selectedCategory);
  }, [selectedCategory]);

  const navigateCocktailId = (id: string) => {
    navigate(`/cocktails/${id}`);
  };

  const handleCategory = (category: string) => {
    setSelectedCategory(category);
    setOpenCategories((previousCategory) =>
      previousCategory.includes(category) ? previousCategory.filter((item) => item !== category) : [...previousCategory, category]
    );
  };

  const fetchSpecificCategory = async (category: string) => {
    try {
      await getCategoryDrinks(category.toLowerCase());
    } catch (error) {
      console.log("Error fetching category drinks:", error);
    }
  };

  return (
    <>
      <div className="bg-img">
        <NavBarComponent />
        <div className="">
          <h1 className="m-12 text-center text-5xl titel-text p-10 rounded-lg">Try our fantastic bevreges!</h1>
        </div>
        <div className="flex flex-wrap ">
          <div className="w-1/4 pl-10 ">
            <div className="w-64 text-white rounded-lg ">
              <div className="p-4">
                <h2 className="text-lg font-bold">Cocktails</h2>
              </div>
              <div>
                <ul>
                  <li className="py-3 px-4">
                    <button
                      className="cursor-pointer flex items-center hover:underline"
                      onClick={() => handleCategory("alcoholic")}
                    >
                      <span>Cocktails with alcohol</span>
                      {openCategories.includes("alcoholic") ? <FaAngleDown className="ml-2" /> : ""}
                    </button>
                    {openCategories.includes("alcoholic") && (
                      <ul className="ml-4">
                        <li>
                          <button className="hover:underline" onClick={() => handleCategory("Gin")}>
                            Gin
                          </button>
                        </li>
                        <li>
                          <button className="hover:underline" onClick={() => handleCategory("Vodka")}>
                            Vodka
                          </button>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li className="py-3 px-4">
                    <button
                      className="cursor-pointer flex items-center hover:underline"
                      onClick={() => handleCategory("nonAlcoholic")}
                    >
                      <span>Cocktails without alcohol</span>
                      {openCategories.includes("nonAlcoholic") ? <FaAngleDown className="ml-2" /> : ""}
                    </button>
                    {openCategories.includes("nonAlcoholic") && (
                      <ul className="ml-4">
                        <li>
                          <button className="hover:underline" onClick={() => handleCategory("Fresh")}>
                            Fresh
                          </button>
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-3/4 flex flex-wrap pr-10 mb-10  ">
            {categoryDrinks && categoryDrinks.slice(0, 9).map((drink) => (
              <div key={drink.idDrink} className="w-1/3 px-2 mb-4" onClick={() => navigateCocktailId(drink.idDrink)}>
                <div className="bg-white p-5 shadow-md card-fade-in">
                  <p className="text-lg font-semibold">
                    {drink.strDrink}
                  </p>
                  <img src={drink.strDrinkThumb} alt={drink.strDrink} className="w-full h-auto mb-2" />
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
      <FooterComponent />

    </>

  );
}

export default PresentCocktails;