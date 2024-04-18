// Alexander

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useRecipeState from "../../State/indexState";
import NavBarComponent from "../NavBarComponent";
import FooterComponent from "../Footer/FooterComponent";
import '../../Styling/Dishes.css'
import '../../Styling/Cocktail.css'


function Test() {
  const getRecipe = useRecipeState((state) => state.fetchRecipe);
  const recipe = useRecipeState((state) => state.recipes);
  const addAllrecipes = useRecipeState((state) => state.addAllRecipesToDatabase);
  const clearDatabase = useRecipeState((state) => state.clearAllRecipes);

  const navigate = useNavigate();

  useEffect(() => {
    getRecipe();
  }, [getRecipe]);

  return (
   <>
   <NavBarComponent/>
   <button className="border bg-red-500 text-white"
   onClick={clearDatabase}
   >Delete all recipes</button>
   <button
   className="border bg-red-500 text-white"
    onClick={(addAllrecipes)}>Add all recipes</button>
   <div className="background-img bg-slate-50i" 
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

    {recipe.map((recipe) => (
        <div key={recipe._id} onClick={() => navigate(`/test/${recipe._id}`)}
        className="img-card">
            <h1 className="text-4xl titel-text text-center mt-10 mb-10  text-white" 
                 style={{backgroundColor: 'rgb(0, 20, 0, 0.5)',  }}>
              {recipe.title}
              </h1>
                  <div className="mb-10">
                    <img src={recipe.imageUrl} alt="" className="dish-img border shadow-lg  p-12"
                      style={{backgroundColor: 'rgba(0, 20, 0,0.5)'}}/>
                  </div>
              </div>
            ))}
    </div>
        <FooterComponent/>
    </>
  );
}

export default Test;
