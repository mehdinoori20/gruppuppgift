import NavBarComponent from '../components/NavBarComponent';
import FooterComponent from '../components/Footer/FooterComponent';
import useRecipeState from '../State/indexState';
import { useEffect, useState } from 'react';





const Categories = () => {
  const fetchRecipe = useRecipeState((state) => state.fetchRecipe)
  const { recipes } = useRecipeState()
  const [scandinavianDishes, setScandinavianDishes] = useState<any[]>([]);
  const [americanDishes, setAmericanDishes] = useState<any[]>([]);
  const [italianDishes, setItalianDishes] = useState<any[]>([]);
  const [frenchDishes, setFrenchDishes] = useState<any[]>([]);
  const [spanishDishes, setSpanishDishes] = useState<any[]>([]);
  const [asianDishes, setAsianDishes] = useState<any[]>([]);
  const [mediterraneanDishes, setMediterraneanDishes] = useState<any[]>([]);
  const [mexicanDishes, setMexicanDishes] = useState<any[]>([])

  
 

  useEffect(() => {
    fetchRecipe();
    
  },[])

  useEffect(()=>{
    if(recipes.length > 0) {
    const scandinavianDish = recipes.filter(recipe => 
      recipe.categories.includes('Scandinavian')||
      recipe.categories.includes('Swedish'));
    

    const americanDish = recipes.filter(recipe => 
      recipe.categories.includes('American'));

    const italianDish = recipes.filter(recipe =>
      recipe.categories.includes('Italian'));
    
    const frenchDish = recipes.filter(recipe =>
      recipe.categories.includes('French'));

    
    const spanishDish = recipes.filter(recipe =>
        recipe.categories.includes('Spanish'));  
    
   
    const asianDish = recipes.filter(recipe =>
      recipe.categories.includes('Japanese') ||
      recipe.categories.includes('Thai') ||
      recipe.categories.includes('Chinese'));


    const mediterraneanDish = recipes.filter(recipe =>
      recipe.categories.includes('Mediterranean'))  
    
    const mexicanDish = recipes.filter(recipe =>
        recipe.categories.includes('Mexican'))  
    
      

      setAmericanDishes(americanDish);
      setScandinavianDishes(scandinavianDish);
      setItalianDishes(italianDish);
      setFrenchDishes(frenchDish);
      setSpanishDishes(spanishDish);
      setAsianDishes(asianDish);
      setMediterraneanDishes(mediterraneanDish);
      setMexicanDishes(mexicanDish);
    }

  }, [recipes])

  
  
    return (
      <>
     
      <div>
        <h1 className='text-4xl mb-10'>Våra kategorier</h1>
        <div>
          <h2 className='text-3xl'>Scandinavian Dishes</h2>
          <ul>
            {scandinavianDishes.map((dish) => (
              <li key={dish._id}>
               {/* <img src={dish.imageUrl} alt={dish.title} />*/}
                <p>{dish.title}</p>
               
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className='text-3xl'>American Dishes</h3>
          <ul>
            {americanDishes.map((dish) => (
              <li key={dish._id}>
                {/*<img src={dish.imageUrl} alt={dish.title} />*/}
                <p>{dish.title}</p>
               
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className='text-3xl'>Italian Dishes</h4>
          <ul>
            {italianDishes.map((dish) => (
              <li key={dish._id}>
                {/*<img src={dish.imageUrl} alt={dish.title} />*/}
                <p>{dish.title}</p>
               
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className='text-3xl'>Spanish Dishes</h4>
          <ul>
            {spanishDishes.map((dish) => (
              <li key={dish._id}>
                {/*<img src={dish.imageUrl} alt={dish.title} />*/}
                <p>{dish.title}</p>
               
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className='text-3xl'>Asian Dishes</h4>
          <ul>
            {asianDishes.map((dish) => (
              <li key={dish._id}>
                {/*<img src={dish.imageUrl} alt={dish.title} />*/}
                <p>{dish.title}</p>
               
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className='text-3xl'>French Dishes</h4>
          <ul>
            {frenchDishes.map((dish) => (
              <li key={dish._id}>
                {/*<img src={dish.imageUrl} alt={dish.title} />*/}
                <p>{dish.title}</p>
               
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className='text-3xl'>Mediterranean Dishes</h4>
          <ul>
            {mediterraneanDishes.map((dish) => (
              <li key={dish._id}>
                {/*<img src={dish.imageUrl} alt={dish.title} />*/}
                <p>{dish.title}</p>
               
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className='text-3xl'>Mexican Dishes</h4>
          <ul>
            {mexicanDishes.map((dish) => (
              <li key={dish._id}>
                {/*<img src={dish.imageUrl} alt={dish.title} />*/}
                <p>{dish.title}</p>
               
              </li>
            ))}
          </ul>
        </div>
      </div>
      
    </>
  );
};
  
export default Categories;