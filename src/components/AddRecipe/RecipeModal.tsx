// Alexander

import React, { useEffect, useState } from "react";
import { Recipe, Ingredient } from "../../data/Recipes";
import useRecipeState from "../../State/indexState";


interface ModalProps {
  recipe: Recipe;
  imageUrl: string;
  isOpen: boolean;
  onCancel: () => void;
}

function Modal({ recipe, imageUrl, isOpen, onCancel }: ModalProps) {
  const getUpdate = useRecipeState((state) => state.updateRecipes);
  const [updatedRecipe, setUpdatedRecipe] = useState<Recipe>(recipe);
  const [displayNewUrl, setDisplayNewUrl] = useState("");
  const [newIngredient, setNewIngredient] = useState({ name: "", amount: "",unit: "",});
  const [newInstruction, setNewInstruction] = useState("");
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    setUpdatedRecipe(recipe);
    const handleKeyEvent = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleKeyEvent);

    return () => document.removeEventListener("keydown", handleKeyEvent);
  }, [isOpen, onCancel]);


  
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {  // does many things, first takes user care of user input
    const { name, value } = e.target; // depending on the HTML element "name" changes the value

    if (name === "imageUrl") {     
        setDisplayNewUrl(value);
    }

    setUpdatedRecipe((updateRecipe) => ({ ...updateRecipe, [name]: value,}));
  };


  const handleIngredientChange = ( index: number, property: string, newValue: string) => { // to handle change in ing value
    setUpdatedRecipe((updateRecipe) => {
      const updatedIngredients = [...(updateRecipe.ingredients || [])];
      updatedIngredients[index] = {
        ...updatedIngredients[index],
        [property]: newValue,
      };

      return { ...updateRecipe, ingredients: updatedIngredients };
    });
  };

  const handleInstructionChange = (index: number, newValue: string) => { // to handle change in inst value
    setUpdatedRecipe((updateRecipe) => {
      const updatedInstructions = [...(updateRecipe.instructions || [])];

      return { ...updateRecipe, instructions: updatedInstructions };
    });
  };


  const handleCategoryChange = (index: number, newValue: string) => { // to handle change in cat value
    setUpdatedRecipe((updateRecipe) => {
      const updatedCategories = [...updateRecipe.categories];
      updatedCategories[index] = newValue;

      return { ...updateRecipe, categories: updatedCategories };
    });
  };


  const handleRecipeUpdate = () => { // basic update to update whole recipe which trigger on "OK" button
    getUpdate(updatedRecipe._id, updatedRecipe);
    onCancel();
  };


  const deleteIngredient = (index: number) => { // logic to handle deletion of specific ing and if its needed
    
    setUpdatedRecipe((updateRecipe) => {
      const updatedIngredients = [...(updateRecipe.ingredients || [])];
      updatedIngredients.splice(index, 1);

      getUpdate(updateRecipe._id, {
        ...updateRecipe,
        ingredients: updatedIngredients,
      });

      return { ...updateRecipe, ingredients: updatedIngredients };
    });
  };


  const deleteInstruction = (index: number) => { // to handle deleting inst if needed
    setUpdatedRecipe((updateRecipe) => {
      const updatedInstructions = [...(updateRecipe.instructions || [])];
      updatedInstructions.splice(index, 1);

      getUpdate(updateRecipe._id, {
        ...updateRecipe,
        instructions: updatedInstructions,
      });

      return { ...updateRecipe, instructions: updatedInstructions };
    });
  };


  const deleteCategory = (index: number) => { // to handle deleting categ if needed
    setUpdatedRecipe((updateRecipe) => {
      const updatedCategories = [...(updateRecipe.categories || [])];
      updatedCategories.splice(index, 1);

      getUpdate(updateRecipe._id, {
        ...updateRecipe,
        categories: updatedCategories,
      });

      return { ...updateRecipe, categories: updatedCategories };
    });
  };


  const addIngredient = () => { // with calling the state and using each parameter to add a new ingredient directly
    setUpdatedRecipe((updateRecipe) => ({
      ...updateRecipe,
      ingredients: [
        ...(updateRecipe.ingredients || []),
        {
          name: newIngredient.name,
          amount: parseFloat(newIngredient.amount),
          unit: newIngredient.unit,
        },
      ],
    }));
    setNewIngredient({ name: "", amount: "", unit: "" });
  };


  const addInstruction = () => { // as instruction only is one line, this was easier to handle. one state to add a new string to array
    setUpdatedRecipe((updatedRecipe) => ({
      ...updatedRecipe,
      instructions: [...(updatedRecipe.instructions || []), newInstruction],
    }));
    setNewInstruction("");
  };

  const addCategory = () => {
    setUpdatedRecipe((updatedRecipe) => ({
      ...updatedRecipe,
      categories: [...(updatedRecipe.categories || []), newCategory],
    }));
    setNewCategory("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-scroll">
      <div className="flex items-center justify-center min-h-screen pt-2 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full max-h-screen modal-content">
          <div className="flex justify-between">
            <div className="py-4 px-6 w-1/2">
              <input
                id="title"
                type="text"
                name="title"
                placeholder={recipe.title}
                onChange={handleUserInput}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-1 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
              />
              <input
                id="Description"
                type="text"
                name="description"
                placeholder={recipe.description}
                onChange={handleUserInput}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-1 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
              />
              <input
                id="imageUrl"
                type="text"
                name="imageUrl"
                placeholder="Paste new URL here"
                onChange={handleUserInput}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-1 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
              />
              <input
                id="timesInMins"
                type="number"
                name="timeInMins"
                placeholder={`old time ${recipe.timeInMins.toString()}`}
                onChange={handleUserInput}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-1 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
              />
               <input
                id="price"
                type="number"
                name="price"
                placeholder={"add price here"}
                onChange={handleUserInput}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-1 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
              />
              CATEGORIES
              <div style={{ maxHeight: "120px", overflowY: "auto" }}>
                {updatedRecipe.categories?.map(
                  (category: string, index: number) => (
                    <li key={index} className="flex">
                      <input
                        id="instruction"
                        type="text"
                        placeholder={category}
                        onChange={(e) =>
                          handleCategoryChange(index, e.target.value)
                        }
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white"
                      />
                      <button
                        onClick={() => deleteCategory(index)}
                        className=" w-1/5 bg-red-400 hover:bg-red-500 text-white font-bold py-0 px-2 border border-red-500 rounded h-8 w-15 text-xs"
                      >
                        Remove
                      </button>
                    </li>
                  )
                )}
                <li className="flex">
                  <input
                    id="ingredientUnit"
                    type="text"
                    placeholder={"add a new category"}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white"
                  />
                  <button
                    onClick={() => addCategory()}
                    className=" w-1/5 bg-green-600 hover:bg-green-500 text-white font-bold py-0 px-2 border border-green-600 rounded h-8 w-15 text-xs"
                  >
                    Add
                  </button>
                </li>
              </div>
            </div>
            <div className="py-2 px-2 w-1/2 w-500 h-350">
              <img
                src={displayNewUrl || imageUrl}
                alt="Preview"
                style={{ width: "500px", height: "350px", objectFit: "cover" }}
                className="py-3 px-4"
              />
            </div>
          </div>
          <div className="flex py-4 px-6">
            <div
              className="w-1/2"
              style={{ overflowY: "auto", maxHeight: "350px" }}
            >
              <div>INGREDIENTS</div>
              {updatedRecipe.ingredients?.map(
                (ingredient: Ingredient, index: number) => (
                  <li key={index} className="flex">
                    <input
                      id="ingredientName"
                      type="text"
                      placeholder={ingredient.name}
                      onChange={(e) =>
                        handleIngredientChange(index, "name", e.target.value)
                      }
                      className="appearance-none block w-1/4 bg-gray-200 text-gray-700 border py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white"
                    />
                    <input
                      id="ingredientAmount"
                      type="text"
                      placeholder={
                        ingredient.amount ? ingredient.amount.toString() : ""
                      }
                      onChange={(e) =>
                        handleIngredientChange(index, "amount", e.target.value)
                      }
                      className="appearance-none block w-1/4 bg-gray-200 text-gray-700 border py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white"
                    />
                    <input
                      id="ingredientUnit"
                      type="text"
                      placeholder={ingredient.unit}
                      onChange={(e) =>
                        handleIngredientChange(index, "unit", e.target.value)
                      }
                      className="appearance-none block w-1/4 bg-gray-200 text-gray-700 border py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white"
                    />
                    <button
                      onClick={() => deleteIngredient(index)}
                      className=" w-1/5 bg-red-400 hover:bg-red-500 text-white font-bold py-0 px-2 border border-red-500 rounded h-8 w-15 text-xs"
                    >
                      Remove
                    </button>
                  </li>
                )
              )}
              <li className="flex">
                <input
                  id="ingredientAmount"
                  type="text"
                  placeholder={"new ingredient"}
                  onChange={(e) =>
                    setNewIngredient((ingredient) => ({
                      ...ingredient,
                      name: e.target.value,
                    }))
                  }
                  className="appearance-none block w-1/4 bg-gray-200 text-gray-700 border py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white"
                />
                <input
                  id="ingredientUnit"
                  type="text"
                  placeholder={"New unit"}
                  onChange={(e) =>
                    setNewIngredient((ingredient) => ({
                      ...ingredient,
                      unit: e.target.value,
                    }))
                  }
                  className="appearance-none block w-1/4 bg-gray-200 text-gray-700 border py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white"
                />
                <input
                  id="ingredientUnit"
                  type="text"
                  placeholder={"New measurement"}
                  onChange={(e) =>
                    setNewIngredient((ingredient) => ({
                      ...ingredient,
                      amount: e.target.value,
                    }))
                  }
                  className="appearance-none block w-1/4 bg-gray-200 text-gray-700 border py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white"
                />
                <button
                  onClick={() => addIngredient()}
                  className=" w-1/5 bg-green-600 hover:bg-green-500 text-white font-bold py-0 px-2 border border-green-600 rounded h-8 w-15 text-xs"
                >
                  Add
                </button>
              </li>
            </div>

            <div
              className="w-1/2"
              style={{ overflowY: "auto", maxHeight: "350px" }}
            >
              <div>INSTRUCTIONS</div>
              {updatedRecipe.instructions?.map(
                (instruction: string, index: number) => (
                  <li key={index} className="flex">
                    <input
                      id="instruction"
                      type="text"
                      placeholder={instruction}
                      onChange={(e) =>
                        handleInstructionChange(index, e.target.value)
                      }
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white"
                    />
                    <button
                      onClick={() => deleteInstruction(index)}
                      className=" w-1/5 bg-red-400 hover:bg-red-500 text-white font-bold py-0 px-2 border border-red-500 rounded h-8 w-15 text-xs"
                    >
                      Remove
                    </button>
                  </li>
                )
              )}
              <li className="flex">
                <input
                  id="ingredientUnit"
                  type="text"
                  placeholder={"add a new instruction"}
                  onChange={(e) => setNewInstruction(e.target.value)}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-1 px-1 mb-3 leading-tight focus:outline-none focus:bg-white"
                />
                <button
                  onClick={() => addInstruction()}
                  className=" w-1/5 bg-green-600 hover:bg-green-500 text-white font-bold py-0 px-2 border border-green-600 rounded h-8 w-15 text-xs"
                >
                  Add
                </button>
              </li>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleRecipeUpdate}
              onKeyDown={handleRecipeUpdate}
            >
              OK
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-400 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onCancel}
            >
              STÄNG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
