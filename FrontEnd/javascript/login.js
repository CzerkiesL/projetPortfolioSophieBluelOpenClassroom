import { checkInputValue, displayError } from "./function/loginForm.js";

const loginForm = document.querySelector("#login form");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const inputValue = checkInputValue(e);

    if (inputValue) {
        const bodyRequest = JSON.stringify(inputValue);

        const loginResponse = await fetch(
            "http://localhost:5678/api/users/login",
            {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: bodyRequest,
            }
        );
        const login = await loginResponse.json();

        if (login.userId) {
            sessionStorage.setItem("auth", login.token);
            window.location.replace(
                "http://127.0.0.1:5500/index.html"
            );
        } else {
            displayError(["Erreur dans l’identifiant ou le mot de passe"]);
        }
    }
});
