import { html } from "../../node_modules/lit-html/lit-html.js";
import { useState, useEffect } from "https://esm.sh/haunted";

export default function Toast({ toastMessage }) {
    const [show, setShow] = useState(false);


    useEffect(() => {
        if(toastMessage.message){
            setShow(true);
            
            const timer = setTimeout(() => {
                setShow(false)
            }, 2000);
            
            return () => clearTimeout(timer);   
        }
    }, [toastMessage]);
    

    return html`
        <p class="toast" style=${`opacity: ${show ? 1 : 0}`}>${toastMessage.message}</p>

        <style>
            .toast {
                position: sticky;
                bottom: var(--spacing); 
                padding: var(--spacing-s);
                transition: var(--transition);
                border-radius: var(--radius);
                background: var(--blue);
                color: var(--white);
                margin: 0;
                margin-left: auto;
                margin-top: auto;
            }
        </style>
    `;
}