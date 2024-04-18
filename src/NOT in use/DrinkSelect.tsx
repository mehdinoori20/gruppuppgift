// //Alexander -> not doing anything here

//     // take the cocktail category and match it? 
//     // maybe do checks on a really high level? 
//         // have the option to get more drinks? 
//         // maybe have a refresh? 


// import React, { useEffect, useState } from "react";
// import Select from "react-select";
// import useRecipeState from "../State/indexState";

// interface DrinkSelectProps {
//     onSelect: (drnikId: string) => void;
// }


// function DrinkSelected({ onSelect }: DrinkSelectProps): JSX.Element {
//     const [selectedDrink, setSelectedDrink] = useState("");
//     const fetchDrink = useRecipeState((state) => state.fetchDrink)
//     const drinks = useRecipeState((state) => state.drinks);

//     useEffect(() => {
//         fetchDrink();
//     } ,[fetchDrink]);


//     const drinkSelection = drinks.map((drink) => ({
//         value: drink.idDrink,
//         label: drink.strDrink,
//     }));


//     return (
//         <div>
//             <p>
//                 select a drink for the 
//             </p>
//         </div>
//     )
// }