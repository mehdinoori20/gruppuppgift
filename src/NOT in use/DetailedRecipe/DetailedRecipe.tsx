import { useEffect, useState } from 'react'
import { useParams, } from "react-router-dom";
import axios from "axios";
import Description from "../Views/Recipe/Components/Description/Description.tsx";
import Title from "../Views/Recipe/Components/Title/Title.tsx";


const DetailedRecipe = () => {
    const { id } = useParams<{ id: string }>(); //* Hämtar Id från URL
    const [recipe, setRecipe] = useState<any>() //* Sparar resultatet av det vi hämtar

    const getRecipe = () => { //* Hämtar data ifrån backend
        axios.get(`https://sti-java-grupp2-afmbgd.reky.se/recipes/${id}`)
            .then(res => {
                console.log("RESPONSE:", res)
                setRecipe(res.data) //* Sätter värder till useState
            });
    };

    useEffect(() => { //* Kollar upp o vi har ID,
        if (id) {
            getRecipe();
        }
    }, [id]); //* registrerar förändringar hos variabeln "id", när en förändring sker i detta state kommer denna "useEffect" att anropas på nytt


    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <>
                <h1>Recipe</h1>
                <Title title={recipe.title} />
                <Description timeInMins={recipe.timeInMins} categories={recipe.categories} instructions={recipe.instructions} ingredients={recipe.ingredients} description={recipe.description} imageUrl={recipe.imageUrl} />
            </>
        </div>
    )
}

export default DetailedRecipe
