// Gustav & Kristian & Alexander

import { useEffect, useState } from 'react'
import { Link, useParams, } from "react-router-dom";
import { IoIosStar } from "react-icons/io";
import { MdOutlineTimer } from "react-icons/md";
import useRecipeState from "../../State/indexState.tsx";
import { Recipe } from "../../data/Recipes.ts";
import Modal from '../AddRecipe/RecipeModal.tsx';
import RecipeRating from '../SearchRecipe/RecipeRating.tsx';
import SuggestCocktail from '../Cocktails/SuggestCocktail.tsx';



const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>()
  const getRecipe = useRecipeState((state) => state.fetchSpecificRecipe)
  const detailedRecipe = useRecipeState((state) => state.detailedRecipe as Recipe)
  const [checkedStates, setCheckedStates] = useState<boolean[]>([]);
  const [isModalOpen, setIsModalOpe] = useState(false);
  const [selectRecipeId, setselectedRecipeId] = useState("");


  useEffect(() => {
    setCheckedStates(new Array(detailedRecipe.instructions?.length).fill(false));
  }, [detailedRecipe.instructions]);

  const handleCheckboxChange = (index: number): void => {
    const updatedCheckedStates = [...checkedStates];
    updatedCheckedStates[index] = !updatedCheckedStates[index];
    setCheckedStates(updatedCheckedStates)
  }



  useEffect(() => {
    if (id) {
      getRecipe(id);
      console.log(id);
    }
  }, [getRecipe, id]);

  const openModal = (recipeId: string) => {
    setselectedRecipeId(recipeId);
    setIsModalOpe(true);
  };

  const closeModal = () => {
    setIsModalOpe(false);
  };

  const handleAddToCart = () => {
    console.log('Recipe added to cart:', detailedRecipe);
    useRecipeState.getState().addToCart(detailedRecipe);
    console.log('Updated cart:', useRecipeState.getState().cart);
  };

  return (
    <>
   
      <Modal

        isOpen={isModalOpen}
        onCancel={closeModal}
        imageUrl={detailedRecipe.imageUrl}
        recipe={detailedRecipe}
      />

      <div className="container mx-auto my-8 p-6 bg-green-50 shadow-lg rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <div>
            <div className="flex justify-between items-center mr-4">
              <h1 className="text-4xl font-bold break-words flex-grow">{detailedRecipe.title}</h1>
              <div className="flex items-center">
                <MdOutlineTimer className='text-3xl' />
                <span className='text-lg ml-2'>{detailedRecipe.timeInMins} min</span>
                <span className='font-semibold text-lg ml-4'>{detailedRecipe.price} kr</span>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-lg font-semibold ml-2">{Math.round(detailedRecipe.avgRating)}</span>
              <IoIosStar className="text-yellow-400 text-2xl ml-1" />
              <span className="ml-2 text-lg">Rating</span>
            </div>
            <p className="mt-4">{detailedRecipe.description}</p>
            <div className="flex space-x-2 mt-4">
              <button id="addButtonToCart" onClick={handleAddToCart} className="bg-green-600 hover:bg-green-800 text-white py-2 px-4 rounded transition duration-300">
                Add to Cart
              </button>
              <button onClick={() => openModal(detailedRecipe._id)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded transition duration-300">
                Change Recipe
              </button>
            </div>
            <SuggestCocktail detailedRecipe={detailedRecipe} />
          </div>
          <div className="w-full h-4/5 overflow-hidden rounded">
            <img
              src={detailedRecipe.imageUrl}
              alt="Recipe"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <div className='flex-1'>
            <h2 className="text-2xl font-bold">Ingredients</h2>
            <ul className="list-disc list-inside mt-2">
              {detailedRecipe.ingredients?.map((ingredient, index) => (
                <li key={index} className="mt-2 flex items-start p-2 bg-white border border-gray-200 rounded-md">
                  <span className="font-semibold">
                    {ingredient.amount} {ingredient.unit}
                  </span>
                  <span className='ml-2'>{ingredient.name}</span>
                </li>
              ))}
            </ul>
          </div>


          <div className="flex-1 mt-8 md:mt-0">
            <h2 className="text-2xl font-bold">Method</h2>
            <div className="space-y-2">
              {detailedRecipe.instructions?.map((step, index) => (
                <div key={index} className="mt-2 flex items-start p-2 bg-white border border-gray-200 rounded-md">
                  <input
                    id={`checkbox-${index}`}
                    type="checkbox"
                    name={`checkbox-${index}`}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                    checked={checkedStates[index]}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <label
                    htmlFor={`checkbox-${index}`}
                    className={`ml-3 text-md font-medium ${checkedStates[index] ? 'text-gray-400' : 'text-gray-700'}`}
                  >
                    {step}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className='mt-4'>Rate this dish and let us know what you think!</p>
        <p className="mt-1">{detailedRecipe.ratings}</p>
        {id && (
          <RecipeRating rating={5} dishId={id || ""} />
        )}
      </div >
    </>
  );
};


export default RecipeDetails
