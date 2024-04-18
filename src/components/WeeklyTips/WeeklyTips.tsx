// Kristian
// Done, maybe some styling later

import { useEffect, useState } from 'react';
import useRecipeState from '../../State/indexState';
import { useNavigate } from "react-router-dom";
import NavBarComponent from '../NavBarComponent';
import FooterComponent from '../Footer/FooterComponent';

const WeeklyTips = () => {
  const { recipes } = useRecipeState();
  const [filteredRecipes, setFilteredRecipes] = useState<any[]>([]);
  const [currentRecommendation, setCurrentRecommendation] = useState('');
  const navigate = useNavigate();


  const updateRecommendation = (day: string) => {
    let recommendation = "";
    switch (day) {
      case "Monday":
        recommendation = "Start your week strong with a fulfilling meat dish that satisfies your soul!";
        break;
      case "Tuesday":
        recommendation = "Tuesday's treasures from the sea—delight in the delicate flavors of fish, a true culinary adventure!";
        break;
      case "Wednesday":
        recommendation = "Midweek calls for a touch of elegance—indulge in the rich flavors of French cuisine!"
        break;
      case "Thursday":
        recommendation = "Embrace the simplicity and refinement of Japanese dishes this Thursday!"
        break;
      case "Friday":
        recommendation = "Who doesn't love tacos or Mexican on a Friday? Celebrate the weekend's arrival with vibrant flavors!"
        break;
      case "Saturday":
        recommendation = "Saturdays shine with Italian favorites—gather around for a night of pasta and pizza comfort!"
        break;
      case "Sunday":
        recommendation = "Wind down your week with the cozy, homely dishes of Swedish tradition!"
        break;
      default:
        recommendation = "Select a day to see the recommendation";
    }
    setCurrentRecommendation(recommendation);
  };

  const FilterRecipes = (category: string) => {

    setFilteredRecipes(recipes.filter((recipe) => recipe.categories.includes(category) &&
      !recipe.categories.includes("Dessert")
    ).slice(0, 3));
    console.log(setFilteredRecipes.length);
    return filteredRecipes;
  };

  useEffect(() => {
    if (recipes.length === 0) {

      useRecipeState.getState().fetchRecipe();
    }
  }, [recipes]);

  return (

    <div>
      <div className="flex flex-col min-h-screen">
        
        <div className="flex-grow bg-orange-50">
          <div className="max-w-7xl mx-auto my-0 p-4">
            <div className="bg-white p-4" >
              <div className='text-center text-2xl font-semibold text-gray-700 mb-4'>Three carefully selected recipes for each day of the week!</div>
              <div className='flex items-center justify-center gap-1 flex-wrap'>
                <button onClick={() => { FilterRecipes("Meat"); updateRecommendation("Monday"); }} className='bg-green-200 font-medium text-gray-700 px-4 py-2 rounded border border-green-600 shadow hover:bg-green-300 focus:outline-none focus:ring focus:border-green-300'>Monday</button>
                <button onClick={() => { FilterRecipes("Fish"); updateRecommendation("Tuesday"); }} className='bg-green-200 font-medium text-gray-700 px-4 py-2 rounded border border-green-600 shadow hover:bg-green-300 focus:outline-none focus:ring focus:border-green-300'>Tuesday</button>
                <button onClick={() => { FilterRecipes("French"); updateRecommendation("Wednesday"); }} className='bg-green-200 font-medium text-gray-700 px-4 py-2 rounded border border-green-600 shadow hover:bg-green-300 focus:outline-none focus:ring focus:border-green-300'>Wednesday</button>
                <button onClick={() => { FilterRecipes("Japanese"); updateRecommendation("Thursday"); }} className='bg-green-200 font-medium text-gray-700 px-4 py-2 rounded border border-green-600 shadow hover:bg-green-300 focus:outline-none focus:ring focus:border-green-300'>Thursday</button>
                <button onClick={() => { FilterRecipes("Mexican"); updateRecommendation("Friday"); }} className='bg-green-200 font-medium text-gray-700 px-4 py-2 rounded border border-green-600 shadow hover:bg-green-300 focus:outline-none focus:ring focus:border-green-300 '>Friday</button>
                <button onClick={() => { FilterRecipes("Italian"); updateRecommendation("Saturday"); }} className='bg-green-200 font-medium text-gray-700 px-4 py-2 rounded border border-green-600 shadow hover:bg-green-300 focus:outline-none focus:ring focus:border-green-300 '>Saturday</button>
                <button onClick={() => { FilterRecipes("Scandinavian"); updateRecommendation("Sunday"); }} className='bg-green-200 font-medium text-gray-700 px-4 py-2 rounded border border-green-600 shadow hover:bg-green-300 focus:outline-none focus:ring focus:border-green-300 '>Sunday</button>
              </div>
              <div className="text-center mt-4">
                <p className="text-lg font-bold text-red-800">{currentRecommendation || "Choose a day to view the recommendations"}</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 p-4">
              {filteredRecipes.map((recipe, index) => (
                <div key={index} onClick={() => navigate(`/recipe/specificRecipe/${recipe._id}`)} className="w-60 cursor-pointer">
                  <h2 className="text-lg font-semibold">{recipe.title}</h2>
                  <div className="h-48 w-full overflow-hidden rounded-lg">
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.title}
                      className="w-full h-full object-cover transition-transform duration-200 ease-in-out hover:scale-110"
                    />
                  </div>
                </div>
              ))}
            </div >
          </div >
        </div>
       
      </div>
    </div>
  );
};

export default WeeklyTips;