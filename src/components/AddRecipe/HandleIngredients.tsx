// Alexander

import React, { useState } from "react";
import { Ingredient } from "../../data/Recipes";

interface IngredientsListProps {
  ingredient: Ingredient[];
  setIngredient: React.Dispatch<React.SetStateAction<Ingredient[]>>;
}

const typesOfMeasure = [
  "gram",
  "kg",
  "tsp",
  "tbsp",
  "dl",
  "l",
  "pinch",
  "piece",
  "cloves",
  "pot",
  "tablespoon",
  "teaspoon",
  "cup",
  "cups",
  "ounce"
];

function IngredientsList({ ingredient, setIngredient}: IngredientsListProps): JSX.Element {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [selectedMeasure, setSelectedMeasure] = useState(typesOfMeasure[0]);


  const handleAddIngredients = () => {
    try {
      if (name.trim() === "") {
        alert("You need to enter the name of the ingredient");
        return;
      }

      if (isNaN(amount) || amount < 0) {
        alert("You need to enter an amount for the ingredient");
      }

      if (selectedMeasure.trim() == "") {
        alert("Please add what type of measurements is used");
      }


      const addIngredients: Ingredient = {
        name: name,
        amount: amount,
        unit: selectedMeasure,
      };

      setIngredient([...ingredient, addIngredients]);


      setName("");
      setAmount(0);
      setSelectedMeasure(typesOfMeasure[0]);
    } catch (error) {
      console.log("error while adding ingredients: ", error);
    }
  };


  const handleRemoveIngredient = (index: number) => {  setIngredient(ingredient.filter((_, i) => i !== index)); }


  return (
    <div>
      <div className="flex justify-center items-stretch ">
        <div className="w-full">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="ingredient"
              >
                INGREDIENS
              </label>
              <input
                type={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="ingredient"
                placeholder="Ingrediens"
              />

            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="meassure"
              >
                AMOUNT
              </label>
              <input
                type="number"
                value={amount == 0 ? "" : amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="meassure"
                placeholder="Ingrediens"
              />

            </div>
            <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="meassure-unit"
              >
                UNIT 
              </label>
              <select
              id="meassure-unit"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                value={selectedMeasure}
                onChange={(e) => setSelectedMeasure(e.target.value)}
              >
                {typesOfMeasure.map((measure) => (
                  <option key={measure} value={measure}>
                    {measure}
                  </option>
                ))}
                
              </select>
             
              
            </div>
            <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="button"
              >
               <br /> 
              </label>
              <button onClick={handleAddIngredients} id="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 border border-blue-700 rounded">
              ADD
              
              </button>

            </div>
          </div>
          <div className="overflow-x-auto">
            {ingredient.length > 0 && (
          <table className="w-full">
            <thead>
              <tr>
                <th className="border px-1 py-1 bg-slate-400 text-white">Ingrediens</th>
                <th className="border px-1 py-1 bg-slate-400 text-white">Mängd</th>
                <th className="border px-1 py-1 bg-slate-400 text-white">Enhet</th>
              </tr>
            </thead>
            <tbody>
              {ingredient.map((ingredient, index) => (
                <tr key={index}>
                  <td className="border px-0.5 py-0.5 ">{ingredient.name}</td>
                  <td className="border px-0.5 py-0.5 ">{ingredient.amount}</td>
                  <td className="border px-0.5 py-0.5 flex justify-end items-center">{ingredient.unit} 
                  <div className="ml-auto">
                  <button  onClick={(() => handleRemoveIngredient((index)))} className="bg-red-400 hover:bg-red-500 text-white font-bold py-1 px-2 border border-red-500 rounded text-sm">
                     REMOVE</button>
                  </div>
              
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}

export default IngredientsList;
