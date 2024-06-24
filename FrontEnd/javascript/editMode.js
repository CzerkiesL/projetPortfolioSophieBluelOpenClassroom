import * as modalNav from "./function/modalNavigation.js";
import * as modalGallery from "./function/modalGallery.js";
import * as modalForm from "./function/modalForm.js";

import { createGallery } from "./function/gallery.js";
import { createFilterMenu } from "./function/filter.js";
import { projects, fetchWorks } from "./index.js";

////////////////////// charge la partie projet ////////////////////////////////
modalGallery.generateGalleryContent(projects);

modalForm.createCategieOption();

////////////////////// ouverture de la modale ////////////////////////////////
const editBtns = document.querySelectorAll("button.edit-btn");
editBtns.forEach((editBtn) => {
    editBtn.addEventListener("click", () => {
        if (sessionStorage.getItem("auth")) {
            modalNav.openModal();
            modalForm.resetForm();
        }
    });
});

////////////////////// fermeture de la modale ////////////////////////////////
const closeBtns = document.querySelectorAll("i.fa-xmark");
closeBtns.forEach((closeBtn) => {
    closeBtn.addEventListener("click", modalNav.closeModal);
});

const modalBg = document.querySelector("div.modal-bg");
modalBg.addEventListener("click", modalNav.closeModal);

////////////////////// changement de la modale ////////////////////////////////
const modalBtnValidation = document.getElementById("add-img");
modalBtnValidation.addEventListener("click", () => {
    modalNav.toggleModalContent();
});

const arrowBtn = document.querySelector("i.fa-arrow-left");
arrowBtn.addEventListener("click", () => {
    modalNav.toggleModalContent();
    modalForm.resetForm();
});

///////////// verifie si l'image du formulaire est valide ///////////////////
modalForm.checkImage();

///////////// verifie la validiter du formulaire et envoie le nouveau projet ///////////////////
const addForm = document.querySelector("form#modal-form");
addForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const inputImg = document.querySelector("input#image");
    const inputTitle = document.querySelector("input#title");
    const inputCategory = document.querySelector("select#category");

    const formIsValid = modalForm.checkInput();

    if (formIsValid) {
        const formdata = new FormData();
        formdata.append("image", inputImg.files[0]);
        formdata.append("title", inputTitle.value);
        formdata.append("category", inputCategory.value);

        const addNewProjectResponse = await fetch(
            "http://localhost:5678/api/works",
            {
                method: "POST",
                body: formdata,
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("auth")}`,
                },
            }
        )
            .then((response) => {
                console.log(response);
                if (response.ok) {
                    return fetchWorks();
                } else {
                    return Promise.reject(
                        "impossible d'ajouter le nouveau projet"
                    );
                }
            })
            .then((newProjectList) => {
                createFilterMenu(newProjectList);
                createGallery(newProjectList);
                modalGallery.generateGalleryContent(newProjectList);
                modalNav.closeModal();
            })
            .catch((err) => {
                modalForm.createErrorMessage(err, inputImg);
            });
    }
});
