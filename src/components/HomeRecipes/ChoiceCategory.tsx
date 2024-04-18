// Alexander

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useRecipeState from "../../State/indexState";
import NavBarComponent from "../NavBarComponent";
import SidebarMenu from "./RecipeSidebar";

function RecipeCategory() {
  const getRecipes = useRecipeState((state) => state.fetchRecipe);
  const recipes = useRecipeState((state) => state.recipes);
  const [focusedOption, setFocusedOption] = useState("");
  const { category } = useParams();
  const [handleCategory, setHandleCategory] = useState(
    category || "All categories"
  );

  const [dropdownMenus, setDropdownMenus] = useState([
    {
      category: "Daily Meal",
      options: [
        "Breakfast",
        "Lunch",
        "Dinner",
        "Snack",
        "Dessert",
        "Appetizer",
      ],
    },
    {
      category: "Protein",
      options: [
        "Meat",
        "Poultry",
        "Fish",
        "Seafood",
        "Candy",
        "Pork",
        "Soy",
        "Tofu",
        "Vegetarian",
      ],
    },
    {
      category: "Nationalities",
      options: [
        "Italian",
        "Chinese",
        "Indian",
        "Mexican",
        "Japanese",
        "Mediterranean",
        "Scandinavian",
        "American",
        "Thai",
      ],
    },
  ]);

  const navigate = useNavigate();

  const filterRecipe = () => {
    if (handleCategory !== "All categories") {
      console.log(recipes, handleCategory);
      return recipes.filter((recipe) =>
        recipe.categories.includes(handleCategory || "")
      );
    } else {
      return recipes;
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  const categoryHandler = (inputCategory: string) => {
    setHandleCategory(inputCategory);
  };

  return (
    <div>
     
      <div>
        <div>
          <div className="text-lg font-bold">Popular</div>
        </div>
        <div className="flex">
          <div className="w-1/5">
            <h3 className="text-lg font-bold mb-4 pt-5">Categories</h3>
            <div
              className="text-lg cursor-pointer w-full py-2 text-left focus:outline-none hover:underline"
              onClick={() => categoryHandler("All categories")}
            >
              All categories
            </div>
            <div>
            {dropdownMenus.map(({ category, options }) => (
              <SidebarMenu
                key={category}
                category={category}
                options={options}
                categoryHandler={categoryHandler}
              />
              
            ))} 
          </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-4 sm:grid-cols-1">
            {filterRecipe().map((recipe) => (
              <div
                key={recipe._id}
                onKeyDown={(e) => {
                  if (e.key === 'Tab' && !e.shiftKey) {
                    // Move focus to the next card element
   
                  }
  
                  if (e.key === "Enter" && !e.shiftKey) {
                    navigate(`/recipe/specificRecipe/${recipe._id}`)
                  }
                }}
  
                tabIndex={0} 
                className="relative rounded overflow-hidden shadow-lg"
              >
                <img
                  src={recipe.imageUrl}
                  alt=""
                  className="w-full h-64 object-cover"
                  onClick={() =>
                    navigate(`/recipe/specificRecipe/${recipe._id}`)
                  }
                />
                <div className="px-6 py-4">
                  <div className="flex justify-between">
                    <div className="font-bold text-lg mb-2">{recipe.title}</div>
                    <p className="text-gray-600 text-sm pt-1">
                      Rating {Math.round(recipe.avgRating)}
                    </p>
                  </div>
                  <p>{recipe.categories.join(" ")}</p>
                  <p className="text-gray-600 text-sm pb-4">
                    {recipe.description.length > 50
                      ? `${recipe.description.substring(0, 100)}...`
                      : recipe.description}
                  </p>
                </div>
                <div className="absolute bottom-0 right-0 p-2">
                  {recipe.price} kr
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeCategory;
