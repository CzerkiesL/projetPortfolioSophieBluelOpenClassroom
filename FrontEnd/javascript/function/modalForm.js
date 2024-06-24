/******************************************  
 verifie si le ficher selectionner est valide
 ******************************************/
export function checkImage() {
    const inputImg = document.querySelector("input#image");
    const imgError = document.querySelector("div.err-img");

    inputImg.addEventListener("change", () => {
        const img = inputImg.files[0];

        if (img.type === "image/jpeg" || img.type === "image/png") {
            if (img.size < 4000000) {
                imgError.innerHTML = "";

                let reader = new FileReader();

                reader.onload = () => {
                    const formImgGroup =
                        document.querySelector("div.form-img-group");
                    const preveiwImg =
                        document.querySelector("img.img-preview");

                    formImgGroup.classList.add("hide");
                    preveiwImg.classList.remove("hide");

                    preveiwImg.src = reader.result;

                    const submitBtn = document.querySelector("button#sub-btn");
                    submitBtn.removeAttribute("disabled");
                };

                reader.readAsDataURL(img);
            } else {
                createErrorMessage("Fichier trop volumineux", imgError);
            }
        } else {
            createErrorMessage("Mauvais type de fichier", imgError);
        }
    });
}

/******************************************  
 creer un message d'erreur
    param 1: le message d'erreur
    param 2: l'emplacement
 ******************************************/
export function createErrorMessage(message, container) {
    container.innerHTML = "";

    const messageError = document.createElement("p");
    messageError.style.color = "crimson";
    messageError.style.fontSize = "12px";
    messageError.style.margin = "5px 0 0px 5px";
    messageError.innerText = message;
    container.appendChild(messageError);
}

/******************************************  
 recupere les category pour la selection
 ******************************************/
export async function createCategieOption() {
    const categoryResponse = await fetch(
        "http://localhost:5678/api/categories"
    );
    const categorys = await categoryResponse.json();

    const selectCategory = document.querySelector("select#category");

    categorys.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.innerText = category.name;

        selectCategory.appendChild(option);
    });
}

/******************************************  
 verifie que les entree utilisateur soit valide valide
 ******************************************/
export function checkInput() {
    const inputTitleValue = document.querySelector("input#title").value;
    const inputCategoryValue = document.querySelector("select#category").value;
    const titleError = document.querySelector(".err-titre");
    const categoryError = document.querySelector(".err-category");
    let erreurCount = 0;

    if (inputTitleValue === "") {
        createErrorMessage(
            "veuillez renseigner un titre pour le projet",
            titleError
        );
        erreurCount++;
    } else {
        titleError.innerHTML = "";
    }

    if (inputCategoryValue === "0") {
        createErrorMessage(
            "veuillez choisir une categorie pour le projet",
            categoryError
        );
        erreurCount++;
    } else {
        categoryError.innerHTML = "";
    }

    if (erreurCount !== 0) {
        return false;
    } else {
        return true;
    }
}

/******************************************  
 reset complet du formulaire
 ******************************************/
export function resetForm() {
    document.querySelector("div.form-img-group").classList.remove("hide");
    document.querySelector("img.img-preview").classList.add("hide");
    document.querySelector("button#sub-btn").setAttribute("disabled", true);
    document.querySelector("input#image").value = "";
    document.querySelector("input#title").value = "";
    document.querySelector("select#category").value = "0";
    document.querySelector("div.err-img").innerHTML = "";
    document.querySelector(".err-titre").innerHTML = "";
    document.querySelector(".err-category").innerHTML = "";
}
