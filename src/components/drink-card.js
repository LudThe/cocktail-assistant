import { html } from "../../node_modules/lit-html/lit-html.js";

export default function DrinkCard({ drink, toggleDrinkSelect }) {

    const isSelectedStyle = `
        scale: ${drink.added ? 'var(--scale)' : 'inherit'} ;
        box-shadow: ${drink.added ? 'var(--shadow)' : 'inherit'};
    `;

    return html`
        <li class="drink-card" key=${drink.id} style=${isSelectedStyle}>
            <img class="thumb" src=${drink.thumbnail} alt=${drink.name}>

            <div class="drink-info">
                <p>${drink.name}</p>
                <p>${drink.instructions}</p>

                <button @click=${() => toggleDrinkSelect(drink.id, !drink.added)}>
                    <img 
                        src="/src/media/add.svg" 
                        alt="Add or remove icon"
                        style=${`rotate: ${drink.added ? "45deg" : "0deg"}`}
                    >
                </button>
            </div>
        </li>

        <style>
            .drink-card {
                display: flex;
                justify-content: left;
                gap: var(--spacing-s);
                position: relative;
                padding: var(--spacing-s);
                transition: var(--transition);
                border-radius: var(--radius);
            }
            
            .drink-card:hover {
                scale: var(--scale) !important;
                box-shadow: var(--shadow) !important;
            }
            
            .thumb {
                height: 128px;
                width: 128px;
                object-fit: contain;
                border-radius: var(--radius);
            }

            .drink-info p:first-of-type {
                font-weight: bold;
                margin-top: 0;
            }

            .drink-info p:last-of-type {
                padding-bottom: var(--spacing);
            }

            .drink-info button {
                position: absolute;
                bottom: 0;
                right: 0;
                margin: var(--spacing-s);
            }

            .drink-info button img {
                height: 14px;
                width: 14px;
                object-fit: contain;
                transition: var(--transition);
                display: block;
            }
        </style>
    `;
}