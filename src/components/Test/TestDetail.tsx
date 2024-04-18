// Alexander, Mehdi
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useRecipeState from "../../State/indexState.tsx";
import { Recipe } from "../../data/Recipes.ts";
import Modal from "../AddRecipe/RecipeModal.tsx";
import RecipeRating from "../SearchRecipe/RecipeRating.tsx";




function DetailedTestComponent() {
  const { id } = useParams<{ id: string }>();
  
  const fetchSpecificRecipe = useRecipeState((state) => state.fetchSpecificRecipe);
  const detailedRecipe = useRecipeState((state) => state.detailedRecipe as Recipe)
  const deleteRecipe = useRecipeState((state) => state.deleteRecipe)


  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpe] = useState(false);
  const [selectRecipeId, setselectedRecipeId] = useState("");
  
  useEffect(() => {
    if (id) {
        fetchSpecificRecipe(id);
        console.log(id);
    }
  
  }, [fetchSpecificRecipe, id]);
  
  const openModal = (recipeId: string) => {
    setselectedRecipeId(recipeId);
    setIsModalOpe(true);
  };

  const closeModal = () => {
    setIsModalOpe(false);
  };

return (
    <div>
        <h1>hej</h1>
          <button onClick={() => openModal(detailedRecipe._id)} className="border  px-2">
              Change Recipe</button>
                <Modal
                  
                  isOpen={isModalOpen}
                  onCancel={closeModal}
                  imageUrl={detailedRecipe.imageUrl}
                  recipe={detailedRecipe}
                />
              <button onClick={()=>deleteRecipe(detailedRecipe._id)} className="border px-2">
            Delete Recipe
          </button>
        <div>
            {detailedRecipe._id}
              <img src={detailedRecipe.imageUrl} alt="" />
                {detailedRecipe.title}  
                  {detailedRecipe.description}
                 <RecipeRating dishId={detailedRecipe._id} rating={null} 
                    />
            </div>
    
    </div>
  )
}

export default DetailedTestComponent;