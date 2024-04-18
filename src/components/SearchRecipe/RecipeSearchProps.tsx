//Gustav & Kristian

import { Recipe } from "../../data/Recipes";
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import '../../Styling/App.css'

interface RecipeSearchProps {
  recipesFromInterface: Recipe[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

function RecipeSearch({ recipesFromInterface, searchTerm, onSearchChange }: RecipeSearchProps) {
  const filteredRecipes = recipesFromInterface.filter(recipe => {
    return recipe && recipe.title && recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const renderRecipes = searchTerm !== '' ? (
    <ul>
      {filteredRecipes.map((recipe, index) => (
        <li key={index} className='recipe-text-on-search'>
          <Link to={`/recipe/specificRecipe/${recipe._id}`} className=''>{recipe.title},&nbsp;
            <span className='italic'>{recipe.description}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  ) : null;

  return (
    <>
      <div className='input-wrapper max-sm:top-3 max-md:top-3'>
        <FaSearch id='searchIcon' className='search-icon' />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search Recipes"
          />
        </div>
      <div className='search-recipes'>
        {renderRecipes}
    </div>
  </>
  );
};

export default RecipeSearch;