//Alexander och Sertan

import { useEffect } from "react";
import useRecipeState from "../../State/indexState.tsx";
import { useNavigate } from "react-router-dom";
import NavBarComponent from "../NavBarComponent.tsx";
import { StaticCategories } from "../../data/StaticCategoriesRecipe.ts";
import FooterComponent from "../Footer/FooterComponent.tsx";

function RecipeHome() {
  const getRecipe = useRecipeState((state) => state.fetchRecipe);
  const recipe = useRecipeState((state) => state.recipes);
  const navigate = useNavigate();


  useEffect(() => {
    getRecipe();
  }, []);

  

  const FilterHandler = (category: string) => {
  
    const firstFilterRecipe = recipe.filter((recipe) => recipe.categories.includes(category)
    );
    const randomRecipes = firstFilterRecipe.sort(() => Math.random() - 0.5);
    return randomRecipes;
  };

  const locateHandler = (category: string) => {
    navigate(`/recipe/category/${category}`);
  };

  return (
    <div>
     
      <div className="grid gap-8 px-10 py-10 md:grid-cols-2 md:items-center md:text-left">
        <div className="">
          <h1 className="text-3xl font-bold">
            Explore our fantastic recipes and our wide array of option  
          </h1>
          <p>
            the home of the best recipes and culinary experiences
            </p>
        </div>
        <div className="w-full rounded-lg overflow-hidden">
          <img
            src="https://images.cdn.prd.api.discomax.com/2023/09/30/cbf6070c-53af-3219-9f4b-42005e408406.jpeg?f=jpg&q=75&w=1280&w=1200"
            alt=""
            className="rounded-lg max-w-full h-auto"
            
          />
        </div>
      </div>
      <h2 className="text-xl pl-20">
        Something spicy for <b onClick={() => locateHandler("Dinner")}>dinner</b>?
      </h2>
      <div
        className="flex overflow-auto p-10"
        style={{
          fontFamily: "Quattro Sans, sans-serif",
          overflowX: "auto",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {FilterHandler("Dinner")
          .slice(0, 9)
          .map((recipe) => (
            <div data-testid="cardtest"
              key={recipe._id}
              onKeyDown={(e) => {
               
                if (e.key === "Enter" && !e.shiftKey) {
                  navigate(`/recipe/specificRecipe/${recipe._id}`)
                }
              }}

              tabIndex={0} 
              onClick={() => navigate(`/recipe/specificRecipe/${recipe._id}`)}
              className="mx-0.5 relative"
            >
              <div className="rounded overflow-hidden shadow-lg h-80">
                <div className="max-w-3xl">
                  <div style={{ width: "280px" }}>
                    <img
                      src={recipe.imageUrl}
                      alt=""
                      style={{
                        height: "170px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                      className="transition duration-200 hover:scale-110"
                    />
                  </div>
                </div>
                <div className="px-6 py-4">
                  <div className="font-bold text-lg mb-2">{recipe.title.split(' ').length >= 3 ? recipe.title.split(' ').slice(0,2).join(' ').concat("...") : recipe.title}</div>
                  <p className="text-gray-600 text-sm">
                    {recipe.description.split(' ').length > 15
                      ? recipe.description.split(' ').slice(0, 15).join(" ").concat("...") 
                      : recipe.description}
                  </p>
                </div>
                <div>
                <p className="absolute bottom-0 right-0 p-4">{recipe.price} kr</p>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="grid gap-8 px-10 py-10 md:grid-cols-2 md:items-center md:text-left">
        <div className="ml-4">
          <img
            src="https://media.timeout.com/images/103577643/image.jpg"
            alt=""
            className="rounded-lg max-w-full h-auto"
          />
        </div>
        <div className="ml-4">
          <h2 className="text-3xl font-bold pl-10">
            Master the recipes of the professionals
          </h2>
          <p className="pl-10">Michelin-star chefs have left their best tips</p>
        </div>
      </div>
    
      <div className="flex justify-center pt-10">
        <div className="border-t mb-10 w-80%" style={{ width: "80%" }}></div>
      </div>
      <h1 className="font text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl pl-10">Explore our categories</h1>
      <div className="grid grid-cols-1 gap-4 w-full p-10 md:grid md:grid-cols-4 md:gap-2">
        {StaticCategories.map((category) => (
          <div
            key={category.name}
            onKeyDown={(e) => {
             
              if (e.key === "Enter" && !e.shiftKey) {
                locateHandler(category.name)
              }
            }}

            tabIndex={0} 
            className="rounded overflow-hidden shadow-lg md:mb-0  md:w-full"
          >
            <img
              className="w-full h-72 object-cover"
              src={category.imageUrl}
              alt={category.name}
              onClick={() => locateHandler(category.name)}
              style={{ transformOrigin: 'center', cursor: 'pointer' }}
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl">{category.name}</div>
              <p className="text-gray-700 text-base">{category.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pl-12 pt-2 pb-5">
        ... and so many{" "}
        <b
          className="cursor-pointer hover"
          onClick={() => locateHandler("All categories")}
        >
          more
        </b>
      </div>
      <div className="flex justify-center">
        <div className="border-t mb-10 w-80%" style={{ width: "80%" }}></div>
      </div>
      <h2 className="text-xl pl-20 pt-10 ">
        Something <b onClick={() => locateHandler("Dessert")}>sweet</b> while waiting for your clothes?
      </h2>
      <div
        className="flex overflow-auto p-10"
        style={{
          fontFamily: "Quattro Sans, sans-serif",

          overflowX: "auto",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {FilterHandler("Dessert")
          .slice(0, 9)
          .map((recipe) => (
            <div
              key={recipe._id}
              onClick={() => navigate(`/recipe/specificRecipe/${recipe._id}`)}
              className="mx-0.5 relative"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  navigate(`/recipe/specificRecipe/${recipe._id}`)
                }
              }}

              tabIndex={0} 
            >
              <div className="rounded overflow-hidden shadow-lg h-80">
                <div className="max-w-3xl">
                  <div style={{ width: "280px" }}>
                    <img
                      src={recipe.imageUrl}
                      alt=""
                      style={{
                        height: "170px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                      className="transition duration-200 hover:scale-110"
                    />
                  </div>
                </div>
                <div className="px-6 py-4">
                  <div className="font-bold text-lg mb-2">{recipe.title.split(' ').length >= 3 ? recipe.title.split(' ').slice(0,2).join(' ').concat("...") : recipe.title}</div>
                  <p className="text-gray-600 text-sm">
                    {recipe.description.split(' ').length > 15
                      ? recipe.description.split(' ').slice(0, 15).join(" ").concat("...") 
                      : recipe.description}
                  </p>
                </div>
                <div>
                <p className="absolute bottom-0 right-0 p-4">{recipe.price} kr</p>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-center pt-10">
        <div className="border-t mb-10 w-80%" style={{ width: "80%" }}></div>
      </div>
      <h2 className="text-xl pl-12">
        <b>Vegetarian</b> dishes - a more green choice!
      </h2>
      <div
        className="flex overflow-auto p-10"
        style={{
          fontFamily: "Quattro Sans, sans-serif",

          overflowX: "auto",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {FilterHandler("Vegetarian").map((recipe) => (
          <div
            key={recipe._id}
            onClick={() => navigate(`/recipe/specificRecipe/${recipe._id}`)}
            className="mx-0.5 relative"
            onKeyDown={(e) => {
            
              if (e.key === "Enter" && !e.shiftKey) {
                navigate(`/recipe/specificRecipe/${recipe._id}`)
              }
            }}

            tabIndex={0} 
          >
            <div className="rounded overflow-hidden shadow-lg h-80">
              <div className="max-w-3xl">
                <div style={{ width: "280px" }}>
                  <img
                    src={recipe.imageUrl}
                    alt=""
                    style={{
                      height: "170px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                    className="transition duration-200 hover:scale-110"
                  />
                </div>
              </div>
              <div className="px-6 py-4">
                <div className="font-bold text-lg mb-2">{recipe.title.split(' ').length >= 3 ? recipe.title.split(' ').slice(0,2).join(' ').concat("...") : recipe.title}</div>
                <p className="text-gray-600 text-sm">
                  {recipe.description.split(' ').length > 12
                      ? recipe.description.split(' ').slice(0, 12).join(" ").concat("...") 
                      : recipe.description}
                </p>
              </div>
              <div>
              <p className="absolute bottom-0 right-0 p-4">{recipe.price} kr</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <div className="border-t mb-10 w-80%" style={{ width: "80%" }}></div>
      </div>
      <div className="relative overflow-hidden bg-white">
        <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="font text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Inspire with your own recipe
              </h1>
              <p className="mt-4 text-xl text-gray-500">
                Feel like you can do it better? Add yours!
              </p>
            </div>
            <div>
              <div className="mt-10">
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="hidden sm:block"> 
                        <div className="h-100 md:h-96 lg:h-120 w-full md:w-1/2 lg:w-full overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                          <img
                            src="https://www.wnyfamilymagazine.com/downloads/6195/download/Family%20Dinner%20Tips.jpg?cb=ec94adbc30dfdac90e11c6f2d62e45ee"
                            alt="Larger Image"
                            className="h-full w-full object-cover object-center"
                          
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href="/add/"
                  className="inline-block rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-center font-medium text-white hover:bg-indigo-700"
                >
                  Add your own recipe!
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>

      </div>
    </div>
  );
};
export default RecipeHome;
