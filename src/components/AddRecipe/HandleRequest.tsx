// Alexander

import { useState } from "react";
import { Ingredient } from "../../data/Recipes";
import axios from "axios";
import useRecipeState from "../../State/indexState";
import CategorySelected from "./CategorySelect";
import InstructionList from "./HandleInstructions";
import IngredientsList from "./HandleIngredients";
import NavBarComponent from "../NavBarComponent";
import "../../Styling/Dishes.css";
import { useNavigate } from "react-router-dom";

function HandleRequests() {
  const addRecipeState = useRecipeState((state) => state.addRecipe);
  const getApiKey = useRecipeState((state) => state.getApiKey);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ratings, setRating] = useState(0); // alternative a array,  no need for now
  const [imageUrl, setImageUrl] = useState("");
  const [timeInMins, setTimeInMins] = useState(0);
  const [price, setPrice] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const addRecipe = async () => {
    // title, desc nor url can't be empty
    try {
      if (!title || !description || !imageUrl) {  // maybe create a modal here instead     
        alert("You need to add a Title, Description and a image Url");

        return;
      }

      if (timeInMins < 0 || price < 0) {  // making sure price and time isn't minus
        alert("Time and price cannot be negative");
        return;
      }

      const apiKey = getApiKey();

      const addResponse = await axios.post(`${apiKey}`, {
        // for posting with apiKey
        title: title,
        ratings: ratings,
        description: description,
        price: price,
        imageUrl: imageUrl,
        timeInMins: timeInMins,
        categories: categories,
        instructions: instructions,
        ingredients: ingredients,
      });
      console.log(imageUrl);
      addRecipeState(addResponse.data); // dont need to check for response as we do try/catch

      console.log(addResponse.data); // for logging while developing
      // clearForm();

      console.log(addResponse.data._id);
      const confirmation = window.confirm(
        "Recipe added successfully. Do you want to add another recipe?"
      );
      if (confirmation) {
        clearForm(); // Clear the form to add another recipe
      } else {
        // console.log(addResponse.data._id)
        navigate(`/recipe/specificRecipe/${addResponse.data._id}`); // Navigate to the details page recipe
      }
    } catch (error) {
      console.log("Error while adding new recipe to list: ", error);
    }
  };

  const clearForm = () => {
    // resets the form after commiting
    setTitle("");
    setDescription("");
    setRating(0);
    setImageUrl("");
    setTimeInMins(0);
    setPrice(0);
    setCategories([]);
    setInstructions([]);
    setIngredients([]);
  };

  return (
    <div className=" rounded p-6 border-img">
        <div className="flex justify-center items-stretch h-screen">
          <div className="w-full max-w-3xl">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="title-input"
                >
                  TITLE
                </label>
                <input
                  type={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="title-input"
                  placeholder="title"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="description"
                >
                  DESCRIPTION
                </label>
                <input
                  type={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="description"
                  placeholder="description"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="time-in-mins"
                >
                  TIME IN MINUTES
                </label>
                <input
                  id="time-in-mins"
                  type="number"
                  value={timeInMins == 0 ? "" : timeInMins}
                  onChange={(e) =>
                    setTimeInMins(
                      e.target.value === "" ? 0 : Number(e.target.value)
                    )
                  }
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="category-select"
                >
                  CATEGORIES
                </label>
                <CategorySelected
                  selectedCategories={categories}
                  onChange={setCategories}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="url-add"
                >
                  ADD AN URL
                </label>
                <input
                  id="url-add"
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="https://..."
                />

                <p className="text-gray-600 text-xs italic">
                  Make sure the picture exists
                </p>
              </div>
            </div>
            <div>
              <IngredientsList
                ingredient={ingredients}
                setIngredient={setIngredients}
              />
            </div>
            <div>
              <br />
              <InstructionList
                instructions={instructions}
                setInstructions={setInstructions}
              />
            </div>
            <div>
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="url-add"
              >
                PRICE
              </label>
              <input
                id="price"
                type="number"
                value={price == 0 ? "" : price}
                onChange={(e) =>
                  setPrice(e.target.value === "" ? 0 : Number(e.target.value))
                }
                className="appearance-none block w-96 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder=""
              />
            </div>
            <br />
            <div className="pb-10">
              <button onClick={addRecipe} className="border px-1 py-1">
                Add your recipe
              </button>
            </div>
          </div>
        </div>
      </div>
    
  );
}

export default HandleRequests;
