import React from 'react'

interface Props {
    description: string;
    imageUrl: string;
    timeInMins: string;
    categories: string;
    instructions: string;
    ingredients: { name: string; amount: number; unit: string }[];
}
const Description: React.FC<Props> = (props: Props) => {
    const {description,imageUrl,timeInMins,
        categories, instructions,ingredients} = props;

    return (
        <div className="Home-container">
            <p>{description}</p>
            <img src="https://tse4.mm.bing.net/th?id=OIP.R-PtT7wyKUi4uPF0cRnbegHaEt&pid=Api&P=0&h=180" alt="Recipe"/>
            <h4> Ingredienser (4 port)</h4><br/>
                <ul>
                    {ingredients.map((ingredients, index) => (
                        <li key={index}>{`${ingredients.amount} ${ingredients.unit} ${ingredients.name}`}</li>

                    ))}
                </ul>
            <div style={{backgroundColor: "Green", padding: 1, borderRightStyle: "solid", borderRightWidth: 2}}>
                <p> Beskrivning <br/>
                    <br/></p>
            <ul>

            </ul>
            </div>
            <p>
                Tips! Du kan även använda en elvisp föör att göra potatismoset. Vispa inte mer än nödvändigt då moset
                annars kan bli klistrigt.
            </p>
        </div>
    );
}
export default Description

