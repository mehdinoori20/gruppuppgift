// Alexander
//Design by Gustav
//Fixa Idag 2024-03-21!!!!

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useRecipeState from "../../State/indexState";
import '../../Styling/Cocktail.css'
import NavBarComponent from "../NavBarComponent";
import FooterComponent from "../Footer/FooterComponent";


interface Drink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strIngredient1: string;
  strIngredient2: string;
  strGlass: string;

}

function DetailedCocktailComponent() {
  const { id } = useParams<{ id: string }>();
  const fetchSpecificDrink = useRecipeState((state) => state.fetchSpecificDrink);
  const detailedDrink = useRecipeState((state) => state.detailedDrink)

  useEffect(() => {
    if (id) {
      fetchSpecificDrink(id);
    }
  }, [fetchSpecificDrink, id]);

  if (!detailedDrink || Object.keys(detailedDrink).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex align-middle justify-center relative">
        {detailedDrink.map((drink) => (
          <div className="border m-12 shadow-xl bg-green-50" key={drink.idDrink}>
            <h1
              className="
                      text-4xl
                      italic
                      text-center
                      font-bold
                      mt-10">
              {drink.strDrink}
            </h1>
      
            <div className="flex justify-center align-middle">
              <img
                src={drink.strDrinkThumb}
                alt=""
                className=" m-12 rounded-lg cocktail-img"/>
            </div>
 
            <div className="flex alinge-middle justify-center">
              <p className="text-xl m-12">{drink.strInstructions}</p>
            </div>
          </div>
        ))}
    </div>
  </>
  )
}

export default DetailedCocktailComponent;