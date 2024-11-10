import { html } from "../node_modules/lit-html/lit-html.js";
import { component, useState } from "https://esm.sh/haunted";
import DrinkCard from "./components/drink-card.js";
import Toast from "./components/Toast.js";

function App() {
    const [currentDrinks, setCurrentDrinks] = useState([]);
    const [toastMessage, setToastMessage] = useState({id: 0, message: null});
    

    function onSubmit(e) {
        e.preventDefault();
        const searchCondition = e.target.elements.searchCondition.value.toLowerCase();
        setToastMessage({id: 1, message: 'Searching...'});
        setCurrentDrinks([]);
        getData(searchCondition)
    }

    async function getData(searchCondition) {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchCondition}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();

            if (Array.isArray(json.drinks)) {
                handleNewDrinks(json);
            } else {
                setToastMessage({id: 2, message: 'No results found.'});
            }

        } catch (error) {
            console.error(error.message);
        }
    }

    function handleNewDrinks(json) {
        let tempDrinks = [];

        json.drinks.forEach(drink => {
            let tempIngredients = []

            for (const key in drink) {
                if (key.startsWith('strIngredient') && drink[key] !== null) {
                    tempIngredients.push(drink[key]);
                }
            }

            let tempDrink = {
                id: drink.idDrink,
                thumbnail: drink.strDrinkThumb,
                name: drink.strDrink,
                instructions: drink.strInstructions,
                ingredients: [...tempIngredients],
                added: false,
            }

            tempDrinks.push(tempDrink);
        });

        setCurrentDrinks(tempDrinks);
        setToastMessage({id: 3, message: 'Here are the results.'});
    }


    function toggleDrinkSelect(id, added) {
        let tempDrinks = currentDrinks.map(drink => {
            if (drink.id === id) {
                return { ...drink, added: added };
            } else {
                return drink;
            }
        });

        setCurrentDrinks(tempDrinks);

        added ? setToastMessage({id: id, message: 'Ingredients added to shopping list.'}) : setToastMessage({id: id, message: 'Ingredients removed from shopping list.'}) ;
    }



    return html`
            <h1>Cocktail assistant</h1>
            
            <form @submit=${onSubmit}> 
                <input id="searchCondition" name="searchCondition" type="text"> 
                <button type="submit">Search</button> 
            </form>

            
            ${currentDrinks.length > 0 ?
            html` <div class="drinks">
                <ul>
                    ${currentDrinks.map(drink => DrinkCard({ drink: drink, toggleDrinkSelect: toggleDrinkSelect }))}
                </ul>
                
                <shopping-list .drinks=${currentDrinks}></shopping-list>
            </div>`
            : null
        }


        ${Toast({toastMessage: toastMessage})}

        <style>
            :host {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: var(--spacing);
                padding: var(--spacing-s) !important;
                max-width: 980px;
                width: 100%;
                flex: 1;
                border: var(--border);
                background-color: var(--white);
                position: relative
            }

            form {
                max-width: 400px;
                display: flex;
                gap: var(--spacing-s)
            }

            input[type="text"] {
                width: 100%;
                border: var(--border);
                border-radius: var(--radius);
            }

            button {
                cursor: pointer;
                border: var(--border);
                border-radius: var(--radius);
                background: none;
                padding: 8px 12px;
            }

            .drinks {
                width: 100%;
                position: relative;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                gap: var(--spacing);
            }

            ul {
                display: flex;
                flex-direction: column;
                gap: var(--spacing);
                width: 100%;
                max-width: 440px;
                padding: 0;
                margin: 0;
                list-style-type: none;
            }

            @media only screen and (max-width: 900px) {        
                .drinks {
                    flex-direction: column;
                    justify-content: center;
                }

                ul {
                    max-width: 100%;
                }
            }
        </style>
    `;
}

customElements.define("cocktail-app", component(App));