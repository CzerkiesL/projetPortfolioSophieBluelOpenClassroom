/*********************************************************
 Fonction qui verifie les inputs et affiche les erreur si il y en a
    param: l'event

    return: objet information d'identification
 *********************************************************/
export function checkInputValue(e) {
    let messageErreur = [];
    // creation de l'expression reguliere pour verifier le format de l'email
    const regexpEmail = new RegExp(
        /[a-zA-Z0-9\.\-_]*@[a-zA-Z0-9\.\-_]*\.[a-z]*/
    );
    // recuperation des valeurs des input
    let emailValue = e.target.querySelector('input[type="text"]').value;
    let passwordValue = e.target.querySelector('input[type="password"]').value;
    // verification des erreur selon les input
    if (emailValue === "") {
        messageErreur.push("l'email doit être renseigner");
    } else if (!regexpEmail.test(emailValue)) {
        messageErreur.push("l'email doit être valide");
    }

    if (passwordValue === "") {
        messageErreur.push("le mot de passe doit être renseigner");
    } else if (passwordValue.length < 5 || passwordValue.length > 10) {
        messageErreur.push(
            "le mot de passe doit faire entre 5 et 10 caractère"
        );
    }

    // affichage des erreur
    displayError(messageErreur);

    // retourne un objet contenant les information d'identification
    if (messageErreur.length === 0) {
        return {
            email: emailValue,
            password: passwordValue,
        };
    }
}

/*********************************************************
Fonction qui affiche les erreur du formulaire
    param: liste d'erreur    
*********************************************************/
export function displayError(listErrorMessage) {
    const errorContainer = document.querySelector("div.err");

    errorContainer.innerHTML = "";

    let errorList = document.createElement("ul");

    for (let i = 0; i < listErrorMessage.length; i++) {
        let error = document.createElement("li");
        error.innerText = listErrorMessage[i];
        errorList.appendChild(error);
    }

    errorContainer.appendChild(errorList);
}
