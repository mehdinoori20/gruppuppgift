// Alexander
// not in use

import axios from "axios";
import useRecipeState from "../../State/indexState";
import { stat } from "fs";

interface DeleteRecipeProps {
  recipeId: string;
}

const getApiKey = useRecipeState((state) => state.getApiKey);


const DeleteRecipeComponent = ({ recipeId }: DeleteRecipeProps ) => {

    const deleteRecipeState = useRecipeState((state) => state.deleteRecipe);


    const handleDeleteRecipe = async () => {
        try {

          const apiKey = getApiKey();
          
          await axios.delete(`${apiKey}/${recipeId}`); // we can add const response = if we want to log status
          deleteRecipeState(recipeId);
        } catch (error) {
          console.log("Error while deleting recipe: ", error);
        }
      };
    
      return (
        <div>

          <button onClick={handleDeleteRecipe}>Delete Recipe</button> // if we want it to be a button, we can change this however we like
        </div>
      );
};
   

export default DeleteRecipeComponent;