import { html } from "../../node_modules/lit-html/lit-html.js";
import { useState, useEffect, component } from "https://esm.sh/haunted";

function ShoppingList({ drinks }) {
    const [ingredients, setIngredients] = useState([]);


    useEffect(() => {
        let allIngredients = [];

        drinks.forEach(drink => {
            if (drink.added) {
                allIngredients.push(...drink.ingredients);
            }
        });

        let unique = [...new Set(allIngredients)];
        setIngredients(unique)
    }, [drinks]);


    function printShoppingList() {
        let content = this.parentElement;
        let button = content.querySelector('button');
        button.setAttribute("style", "display : none");

        let winPrint = window.open('', '', 'left=0,top=0,width=800,height=900');
        winPrint.document.write(content.innerHTML);
        winPrint.document.close();
        winPrint.focus();
        winPrint.print();
        winPrint.close();

        button.setAttribute("style", "display : initial");
    }


    return html`
        <div>
                <p>Shopping list</p>

                ${ingredients.length > 0 ?
                html` <ul>
                            ${ingredients.map(i => html` <li>${i}</li>`)}
                        </ul>
                            
                        <button @click=${printShoppingList}>Print</button>
                        `
            : html`<p>Is empty</p>`
            }
        </div>

        <style>
            :host {
                display: flex;
                flex-direction: column;
                position: sticky;
                top: var(--spacing);
                max-width: 370px;
                width: 100%;
                overflow: auto;
                height: 80vh;
                padding: var(--spacing-s);
            }

            :host p:first-of-type {
                font-weight: bold;
                margin-top: 0;
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
        

            button {
                cursor: pointer;
                border: var(--border);
                border-radius: var(--radius);
                background: none;
                padding: 8px 12px;
                margin-top: var(--spacing);
                width: fit-content;
            }


            @media only screen and (max-width: 900px) {
                :host {
                    height: 100%;
                    max-width: fit-content;
                }
            }
        </style>
    `;
}

customElements.define("shopping-list", component(ShoppingList));