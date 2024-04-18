//Gustav & Mehdi
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../Styling/Dishes.css'
import RecipeRating from './SearchRecipe/RecipeRating';


interface DishProps {
  id: string;
  name: string;
  image: string;
  recipe?: string;
  ingredients?: string[];
  description?: string;

}

const DishComponent = ({ id, name, image, ingredients, description }: DishProps) => {
  const { dishId } = useParams<{ dishId: string }>(); //Fetching dishId from URL
  
  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    console.log('DishComponent har monterats');
  }, []);
 
 // Om dishId matchar id, visa detaljer om rätten
  if (id === dishId) {
    return (
      <div>
        <h2>{name}</h2>
        <p>{description}</p>
        <img src={image} alt={name} />
        <ul>
          {ingredients?.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <RecipeRating dishId={id} rating={rating} 
        // setRating={setRating}
          />
        
      </div>
    );
  }

 return (
    <div className='card-fade-in hover:scale-75 hover:cursor-pointer transition-transform duration-300 ease-in-out'>
      
        <Link to={`/recipe/specificRecipe/${id}`}>
          <img
            src={image}
            alt={name}
            className="object-cover w-80 h-80 "
          />
        </Link>
      
    <p className="mt-2 font-semibold 2xl:text-2xl xl:text-xm md:text-sm sm:text-2xl lg:text-sm">{name}</p>
      <div className=''>
        <p className="xl:mt-2 xl:w-40 xl:ml-0 2xl:mb-0 
                      2xl:text-xm xl:text-xs 
                      md:text-sm sm:mb-6 
                      max-sm:w-80 lg:w-40 
                      text-justify sm:w-80">{description}</p>
      </div>
    </div>
  );
}

export default DishComponent;
