import { createGallery } from "./gallery.js";
import { createFilterMenu } from "./filter.js";
import { fetchWorks } from "../index.js"; // import la liste de projet

/******************************************  
 genere la liste de projet pour l'incorporer a la modale
    param: liste de projet a afficher
 ******************************************/
export async function generateGalleryContent(projectList) {
    const modalGalleryContent = document.getElementById(
        "modal-gallery-content"
    );

    modalGalleryContent.innerHTML = "";

    projectList.forEach((project) => {
        const modalGalleryElem = document.createElement("div");
        modalGalleryElem.classList.add("img-container");
        modalGalleryElem.innerHTML = `
        <img
        src="${project.imageUrl}"
        alt="${project.title}"
        />
        <button data-id="${project.id}" class="delete">
        <i class="fa-solid fa-trash-can"></i>
        </button>
        `;
        modalGalleryContent.appendChild(modalGalleryElem);

        const deleteBtn = document.querySelectorAll("button.delete");

        deleteBtn.forEach((currentDeleteBtn) => {
            currentDeleteBtn.addEventListener("click", async (event) => {
                const workId = currentDeleteBtn.dataset.id; // recupere id du bouton generer selon le projet
                deleteWork(workId, event);
            });
        });
    });
}

/******************************************  
 fonction qui permet de supprimer les projet dans la gallery
    param1: id du projet a supprimer
    parma2: evenement du click sur le bouton
 ******************************************/
async function deleteWork(workId, event) {
    event.preventDefault();
    event.stopPropagation();
    const userId = sessionStorage.getItem("auth"); // token identification
    const deleteResponse = await fetch(
        `http://localhost:5678/api/works/${workId}`,
        {
            method: "DELETE",
            headers: {
                accept: "*/*",
                Authorization: `Bearer ${userId}`,
            },
        }
    );

    if (deleteResponse.ok) {
        const newProjectList = await fetchWorks();

        createFilterMenu(newProjectList);
        createGallery(newProjectList);
        generateGalleryContent(newProjectList);
    }
}
