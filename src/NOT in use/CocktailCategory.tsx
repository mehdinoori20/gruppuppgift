//Alexander

import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useRecipeState from "../State/indexState";

interface DrinkCategory {
    idDrink: string;
    strIngredient1: string;
    strDrink: string;
    strDrinkThumb: string;
    strInstructions: string;
    strGlass: string;

  }

function CocktailCategory () {
    const { category } = useParams<{category: string}> ();
    const fetchCategory = useRecipeState((state) => state.fetchSpecificDrinkIngredient);
    const categoryDrinks = useRecipeState((state) => state.drinks);

    const navigate = useNavigate();

    useEffect(() => {
        if (category) {
            console.log(category)
            fetchCategory(category);
        }
    },[fetchCategory, category]);


    const navigateCocktailId = (id: string) => { // Navigate to the cocktail ID
        console.log(id)
        navigate(`/cocktails/${id}`); 
      };

    return (
        <div>
            {categoryDrinks.map((drinks) => (
                <div>
                    {drinks.strIngredient1}
                </div>
            ))}
        </div>
    )
}

export default CocktailCategory;