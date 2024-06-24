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
        )
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return Promise.reject(
                        "Erreur dans l’identifiant ou le mot de passe"
                    );
                }
            })
            .then((jsonResponse) => {
                sessionStorage.setItem("auth", jsonResponse.token);
                window.location.replace("http://127.0.0.1:5500/index.html");
            })
            .catch((err) => {
                displayError([err]);
            });
    }
});
