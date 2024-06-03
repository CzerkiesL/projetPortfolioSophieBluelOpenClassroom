import { createGallery } from "./function/gallery.js";
import { createFilterMenu } from "./function/filter.js";

// recuperation des differents projets
export async function fetchWorks() {
    const responseProject = await fetch("http://localhost:5678/api/works");
    const projects = await responseProject.json();
    return projects;
}

export const projects = await fetchWorks();

createFilterMenu(projects); // creer le menu des filtre
createGallery(projects); // creer la gallerie des projets

// gestion de l'affichage selon l'authentification
const editModeElement = document.querySelectorAll(".edit-mode");
const logBtn = document.querySelector("a.log");

if (localStorage.getItem("auth")) {
    logBtn.innerText = "logout";
    logBtn.setAttribute("href", "#");
    editModeElement.forEach((elem) => {
        elem.classList.remove("edit-mode");
    });
} else {
    editModeElement.forEach((elem) => {
        elem.classList.add("edit-mode");
    });
}

logBtn.addEventListener("click", () => {
    if (logBtn.innerText === "logout") {
        localStorage.removeItem("auth");
        logBtn.innerText = "login";
        editModeElement.forEach((elem) => {
            elem.classList.add("edit-mode");
        });
    } else {
        logBtn.setAttribute("href", "./Login.html");
    }
});
