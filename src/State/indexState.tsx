// Alexander & Gustav & Simon & Kristian

import { create } from "zustand";
import { Recipe } from "../data/Recipes";
import axios from "axios";
import { recipes } from '../dataForTestingBulk'; 


interface recipeState {
    recipes: Recipe[];
    drinks: any[];
    allDrinks: any[];
    detailedDrink: any[];
    letterDrinks: any[];
    detailedRecipe: object;
    categoryDishes: any[];
    categoryDrinks: any[];

    cart: any[];
    addToCart: (recipe: Recipe) => void;
    clearCart: () => void;
    removeFromCart(_id: string): void;
    handleIncreaseCart(recipeId: string): void;
    handleDecreaseCart(recipeId: string): void;

    addRecipe: (newRecipes: Recipe) => void;
    deleteRecipe: (id: string) => Promise<void>;
    getApiKey: () => string;
    fetchRecipe: () => void;
    fetchAlcoholicDrinks: () => Promise<void>;
    fetchNonAlcoholicDrinks: () => Promise<void>;

    fetchAllDrinks: () => Promise<void>;
    fetchSpecificDrink: (id: string) => Promise<void>;
    fetchSpecificRecipe: (id: string) => Promise<void>;
    updateRecipes: (recipeId: string, updatedProperties: Partial<Recipe>) => void;
    fetchSpecificDrinkIngredient: (ingredient: string) => Promise<void>;
    addAllRecipesToDatabase: () => void;
    fetchDrinkByLetter: (letter: string) => Promise<void>;
    clearAllRecipes: () => void;
}


const useRecipeState = create<recipeState>()((set) => ({
    recipes: [],
    categoryDishes: [],
    categoryDrinks: [],
    letterDrinks: [],
    drinks: [],
    allDrinks: [],
    detailedDrink: [],
    detailedRecipe: {},
    cart: [],

    getApiKey: () => "https://sti-java-grupp2-afmbgd.reky.se/recipes", // instead of initilazing API over and over

    updateRecipes: (_id: string, updatedProperties: Partial<Recipe>) =>
        set((state) => {
            console.log("Updating recipe with ID:", _id);
            console.log("Updated properties:", updatedProperties);

            const updatedRecipes = state.recipes.map((recipe) => {
                if (recipe._id === _id) {
                    // Merging the recipes, old + new one
                    return { ...recipe, ...updatedProperties };
                }
                return recipe;
            });

            axios
                .patch(
                    `https://sti-java-grupp2-afmbgd.reky.se/recipes/${_id}`,
                    updatedProperties
                )
                .then((updateResponse) => {
                    console.log("update complete ", updateResponse.data);
                })
                .catch((error) => {
                    console.log("error while updating", error);
                });

            return { recipes: updatedRecipes };
        }),

    deleteRecipe: async (_id: string) => {
        try {
            const deleteResponse = await axios.delete(
                `https://sti-java-grupp2-afmbgd.reky.se/recipes/${_id}`
            );

            if (deleteResponse.status === 201) {
                set((state) => ({
                    recipes: state.recipes.filter((recipe) => recipe._id !== _id),
                }));
                console.log("Recipe deleted");
            } else {
                console.log("Response error ", deleteResponse.status);
            }
        } catch (error) {
            console.log("Recipe was not deleted ", error);
        }
    },

    clearAllRecipes: async () => {
        try {
            const response = await axios.get('https://sti-java-grupp2-afmbgd.reky.se/clear')
            if (response.status === 200) {
                console.log('database flushed')
            } else {console.log('bad response: ', response.status)}
        } catch (error) {console.log('failed to clear the database on reqeust')}
    },

    addAllRecipesToDatabase: async () => {
        try { 
            for (let recipe of recipes) {
                const response = await axios.post('https://sti-java-grupp2-afmbgd.reky.se/recipes', recipe);
                if (response.status === 200) {
                    console.log(`Recipe "${recipe.title}" added successfully.`)
                } else {
                    console.log(`Recipe "${recipe.title}" failed to be added.`)
                }
            }
            console.log('Bulk loading complete');
    
        } catch (error) {
            console.error('Error during bulk loading:', error);
        }
    },
    

    addRecipe: (newRecipes: Recipe) =>
        set((state) => ({
            // add a recipe, used in handleRequestComp
            recipes: [...state.recipes, newRecipes],
        })),

    fetchRecipe: async () => {
        // for fetching whole api
        try {
            const response = await axios.get(
                "https://sti-java-grupp2-afmbgd.reky.se/recipes"
            );

            if (response.status === 200) {
                set({ recipes: response.data });

                console.log(response.data);
            } else {
                console.log("Response error while fetching recipes: ", response.status);
            }
        } catch (error) {
            console.log("Error fetching api/data", error);
        }
    },

    fetchAlcoholicDrinks: async () => {
        // for fetching alcoholic drinks
        try {
            const drinkResponse = await axios.get(
                "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail"
            );

            if (drinkResponse.status === 200) {
                const drinksData = await drinkResponse.data.drinks;
                set({ drinks: drinksData });

                console.log(drinksData);
            } else {
                console.log(
                    "Response error while fetcinh alcoholic: ",
                    drinkResponse.status
                );
            }
        } catch (error) {
            console.log("error while fetching drinks ", error);
        }
    },

    fetchNonAlcoholicDrinks: async () => {
        // for fetching non-alcoholic drinks
        try {
            const nonDrinkResponse = await axios.get(
                "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink"
            );

            if (nonDrinkResponse.status === 200) {
                const nonDrinksData = await nonDrinkResponse.data.drinks;
                set({ drinks: nonDrinksData });

                console.log(nonDrinksData);
            } else {
                console.log(
                    "Response error while fetching non alcoholic: ",
                    nonDrinkResponse.status
                );
            }
        } catch (error) {
            console.log("error while fetching non alcoholic drinks", error);
        }
    },

    fetchAllDrinks: async () => {
        try {
            const drinkResponse = await axios.get(
                "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail"
            );
            const nonDrinkResponse = await axios.get(
                "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink"
            );

            if (drinkResponse.status === 200 && nonDrinkResponse.status === 200) {
                const nonDrinksData = nonDrinkResponse.data.drinks;
                const drinksData = drinkResponse.data.drinks;

                const newAllDrinks = [...nonDrinksData, ...drinksData];

                set({ allDrinks: newAllDrinks });
                console.log(newAllDrinks);
            } else {
                console.log(
                    "Response error, while fetching all drinks: ",
                    nonDrinkResponse.status,
                    drinkResponse.status
                );
            }
        } catch (error) {
            console.log("error while fetching all drinks", error);
        }
    },

    fetchSpecificDrink: async (id: string) => {
        try {
            const detailedDrink = await axios.get(
                `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
            );

            if (detailedDrink.status === 200) {
                const detailedDrinkData = detailedDrink.data.drinks;
                set({ detailedDrink: detailedDrinkData });

                console.log(detailedDrinkData);
            } else {
                console.log("Response error: ", detailedDrink.status);
            }
        } catch (error) {
            console.log("error while fetching specific drink", error);
        }
    },

    fetchSpecificDrinkIngredient: async (ingredient: string) => {
        try {
            const detailedIngredient = await axios.get(
                `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
            );

            if (detailedIngredient.status === 200) {
                const categoryDrink = detailedIngredient.data.drinks;
                set({ categoryDrinks: categoryDrink });

              
            } else {
                console.log("error while ingredient GET 200");
            }
        } catch (error) {
            console.log("hehe");
        }
    },

    fetchDrinkByLetter: async (letter: string) => {
        try {
            const filterLetter = await axios.get(
                `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`
            );

            if (filterLetter.status === 200) {
                const drinkByLetter = filterLetter.data.drinks;
                set({ letterDrinks: drinkByLetter });
        
            } else {
                console.log("error while fetching by letter");
            }
        } catch (error) {
            console.log("error", error);
        }
    },

    fetchSpecificRecipe: async (id: string) => {
        try {
            const detailedRecipe = await axios.get(
                `https://sti-java-grupp2-afmbgd.reky.se/recipes/${id}`
            );

            if (detailedRecipe.status === 200) {
                set({ detailedRecipe: detailedRecipe.data });

                console.log(detailedRecipe.data);
            } else {
                console.log("Response error: ", detailedRecipe.status);
            }
        } catch (error) {
            console.log("error while fetching specific drink", error);
        }
    },

    fetchCategoriesRecipes: async (category: string) => {
        try {
            const categoriesRecipes = await axios.get(
                `https://sti-java-grupp2-afmbgd.reky.se/recipes/${category}`
            );

            if (categoriesRecipes.status === 200) {
                set({ recipes: categoriesRecipes.data });

                console.log(categoriesRecipes.data);
            }
        } catch (error) {
            console.log("error while fetcing categories");
        }
    },

    addToCart: (recipe: Recipe) =>
        set((state) => ({
            cart: [...state.cart, recipe],
        })),

    clearCart: () => set(() => ({ cart: [] })),

    removeFromCart: (recipeId: string) =>
        set((state) => ({
            cart: state.cart.filter((recipe) => recipe._id !== recipeId),
        })),

    handleDecreaseCart: (recipeId: string) =>
        set((state) => {
            const updatedCart = [...state.cart];
            const index = updatedCart.findIndex((item) => item._id === recipeId); // to prevent removal of other recipes when decreasing

            if (index !== -1) {
                if (updatedCart[index].quantity > 1) {
                    // might not be needed as splice works pretty great to

                    updatedCart[index].quantity -= 1;
                } else {
                    updatedCart.splice(index, 1); // try out to just splice instead of evaluating the arrays size
                }
            }

            return { cart: updatedCart };
        }),

    handleIncreaseCart: (recipeId: string) =>
        set((state) => {
            // same functionality as decreaseCart <- see those comments
            const updatedCart = [...state.cart];
            const existingItemIndex = updatedCart.findIndex(
                (item) => item._id === recipeId
            );

            if (existingItemIndex !== -1) {
                // Duplicate the existing item
                const existingItem = updatedCart[existingItemIndex];
                const newItem = {
                    ...existingItem,
                    quantity: existingItem.quantity + 1,
                };
                updatedCart.push(newItem); // Push the duplicated item into the cart

            }

            return { cart: updatedCart };
        }),
}));

export default useRecipeState;
