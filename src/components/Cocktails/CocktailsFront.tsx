// Alexander

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useRecipeState from "../../State/indexState";
import NavBarComponent from "../NavBarComponent";
import { StaticLetters, Letter } from "../../data/StaticLetters";
import { StaticCategoriesDrinks } from "../../data/StaticCategoriesDrinks";
import CocktailsModal from "./CocktailsModal";
import FooterComponent from "../Footer/FooterComponent";

function DrinkCategory() {
  const getCategoryDrinks = useRecipeState(
    (state) => state.fetchSpecificDrinkIngredient
  );
  const getDrinksByLetter = useRecipeState((state) => state.fetchDrinkByLetter);
  const letterDrinks = useRecipeState((state) => state.letterDrinks);
  const categoryDrinks = useRecipeState((state) => state.categoryDrinks);
  const [handleCategory, setHandleCategory] = useState("Gin"); // Default category
  const [handleLetter, setHandleLetter] = useState<Letter[]>(StaticLetters);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchSpecificCategory(handleCategory); // for handling sidebar
    fetchDrinkByLetter("a"); // for default loading
  }, [handleCategory]);

  const fetchDrinkByLetter = async (letter: string) => { // fetching depending on the letter
    try {
      await getDrinksByLetter(letter);
    } catch (error) {
      console.log("error while fetching");
    }
  };

  const fetchSpecificCategory = async (category: string) => {  // fetching depending on the category
    try {
      await getCategoryDrinks(category.toLowerCase());
    } catch (error) {
      console.log("Error fetching category drinks:", error);
    }
  };

  const categoryHandler = (inputCategory: string) => {  // sets the category depending on what you click
    setHandleCategory(inputCategory);
  };

  const handleModal = () => {
    setIsModalOpen(true)
    console.log("open modal");
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div>
      
      <div className="grid gap-8 px-10 py-10 md:grid-cols-2 md:items-center md:text-left">
        <div className="">
          <h1 className="text-3xl font-bold">
            Share a drink with friends or enjoy one yourself
          </h1>
          <p>With a wide variety of choices, everything you could imagine</p>
        </div>
        <div className="w-full rounded-lg overflow-hidden">
          <img
            src="https://i.pinimg.com/originals/ce/ac/32/ceac328bf605cddbb08e1fc96229927d.jpg"
            alt=""
            className="rounded-lg max-w-full h-auto"
          />
        </div>
      </div>
      <div>
        <div className="mt-4">
          <p className="text-2xl font-bold mb-2 text-center">
            Filter cocktails by letter
          </p>
          <div className="flex justify-center gap-1">
            {handleLetter.slice(0, 12).map((letter) => (
              <button
                key={letter.letter}
                onClick={() => fetchDrinkByLetter(letter.letter)}
                className="px-6 py-3 border rounded bg-wite-200 hover:bg-green-300 focus:bg-green-500 focus:outline-none text-sm"
              >
                {letter.letter}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-1">
            {handleLetter.slice(12).map((letter) => (
              <button
                key={letter.letter}
                onClick={() => fetchDrinkByLetter(letter.letter)}
                className="px-5 py-3 border rounded bg-wite-200 hover:bg-green-300 focus:bg-green-500 focus:outline-none text-sm"
              >
                {letter.letter}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-center pt-10">
          <div className="border-t mb-10 w-80%" style={{ width: "80%" }}></div>
        </div>
      </div>
      <div
        className="flex overflow-auto p-10"
        style={{
          fontFamily: "Quattro Sans, sans-serif",
          overflowX: "auto",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {letterDrinks?.map((drink) => (
          <div
            key={drink.idDrink}
            onClick={() => navigate(`/cocktails/${drink.idDrink}`)}
            className="mx-0.5"
            onKeyDown={(e) => {
              if (e.key === 'Tab' && !e.shiftKey) {
                // Move focus to the next card element

              }

              if (e.key === "Enter" && !e.shiftKey) {
                navigate(`/cocktails/${drink.idDrink}`)
              }
            }}

            tabIndex={0} 
            
          >
            <div className="rounded overflow-hidden shadow-lg h-80">
              <div className="max-w-3xl">
                <div style={{ width: "320px" }}>
                  <img
                    src={drink.strDrinkThumb}
                    alt={drink.strDrink}
                    style={{
                      height: "220px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                    className="transition duration-200 hover:scale-110"
                  />
                </div>
              </div>
              <div className="px-6 py-4">
                <div className="flex justify-between">
                  <div className="font-bold text-lg mb-2">
                  {drink.strDrink.split(' ').length >= 3 ? 
                    drink.strDrink.split(' ').slice(0, 2).join(' ').concat("...") : 
                    drink.strDrink}
                    </div>
                  <div>
                    <p className="text-gray-600 text-sm py-1">
                      {drink.strIngredient1.split(' ').length >= 3 ? drink.strIngredient1.split(' ').slice(0,2).join(' ').concat("...") :
                      drink.strIngredient1}
                      </p>
                  </div>
                </div>
                <div className="text-gray-600 text-sm">
                  {drink.strInstructions
                    .split(" ")
                    .slice(0, 8)
                    .join(" ")
                    .concat("...")}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center pt-10">
        <div className="border-t mb-10 w-80%" style={{ width: "80%" }}></div>
      </div>
     
      <h1 className="font text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl pl-10">
        Cocktails categories</h1>
      <div className="grid grid-cols-1 gap-4 w-full p-10 md:grid md:grid-cols-4 md:gap-2">
        {StaticCategoriesDrinks.map((category) => (
          <div
            key={category.name}
            className="rounded overflow-hidden shadow-lg md:mb-0  md:w-full"
            onKeyDown={(e) => {
              if (e.key === 'Tab' && !e.shiftKey) {
                // Move focus to the next card element

              }

              if (e.key === "Enter" && !e.shiftKey) {
                categoryHandler(category.name), handleModal()
              }
            }}

            tabIndex={0} 
          >
            <img
              className="z-10 w-full h-72 object-cover"
              src={category.imageUrl}
              alt={category.name}
              onClick={() => {categoryHandler(category.name), handleModal()}}
              style={{ transformOrigin: 'center', cursor: 'pointer' }}
            />
            <div className="z-0 px-6 py-4">
              <div className="font-bold text-xl">{category.name}</div>
              <p className="text-gray-700 text-base">{category.description}</p>
            </div>
          </div>
        ))}
      </div>
      <CocktailsModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        categoryDrinks={categoryDrinks}
        navigate={navigate} 
        category={handleCategory}/>
      <div className="font text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl pl-10">
      </div>
      <div className="flex justify-center pt-10">
        <div className="border-t mb-10 w-80%" style={{ width: "80%" }}></div>
      </div>
      <div>
        
      </div>
    </div>
  );
}

export default DrinkCategory;
