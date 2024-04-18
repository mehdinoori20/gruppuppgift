//Alexander

import Select from "react-select";
import { StylesConfig } from "react-select";


const proteinCategories = [
  "Meat",
  "Poultry",
  "Fish",
  "Seafood",
  "Candy",
  "Pork",
  "Soy",
  "Tofu",
  "Vegetarian",
  "Diary",
];


const nationalitiesOption = [
  "Italian",
  "Chinese",
  "Indian",
  "Mexican",
  "Japanese",
  "Mediterranean",
  "Scandinavian",
  "American",
  "Thai",
];


const mealOptions = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snack",
  "Dessert",
  "Appetizer",
];



interface CategorySelectProps {
  selectedCategories: string[];
  onChange: (selectedCategories: string[]) => void;
}

const customStyle: StylesConfig = {  // using custom styling directly from react-select instead of building it from scratch
  control: (provided) => ({
    ...provided,
    width: "100%", 
    fontFamily: "monospace",
  }),

  group: (provided) => ({
    ...provided,
    paddingTop: "5px",

  }),

  menu: (provided) => ({
    ...provided, 
    maxWidth: "400px",
    whiteSpace: "normal",
    fontFamily: "monospace",
  })
};


function CategorySelected({ selectedCategories, onChange }: CategorySelectProps) {  // used for mapping and selecting, categories. As well as filter out the once selected
  const groupedOptions = [
    { label: "Måltider", options: mealOptions.map((option) => ({ value: option, label: option, group: "mealtype" })) },
    { label: "Nationaliteter", options: nationalitiesOption.map((option) => ({ value: option, label: option, group: "nationality" })) },
    { label: "Protein", options: proteinCategories.map((option) => ({ value: option, label: option, group: "proteinCategories" })) },
  ];

  
  return (
    <Select
      id ="category-select"
      placeholder ="välj..."
      styles={customStyle}
      isMulti
      options={groupedOptions}
      value={selectedCategories.map((category) => ({ value: category, label: category }))}
      onChange={(selectedOptions) => onChange((selectedOptions as { value: string; label: string }[]).map((option) => option.value))}
    />
  );
}

export default CategorySelected;
