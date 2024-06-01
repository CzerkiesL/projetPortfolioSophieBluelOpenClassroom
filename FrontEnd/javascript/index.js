import { createGallery } from "./function/gallery.js";
import { createFilterMenu, filterByCategories } from "./function/filter.js";

// recuperation des differents projets
const responseProject = await fetch("http://localhost:5678/api/works");
 export const projects = await responseProject.json();

createFilterMenu(projects); // creer le menu des filtre
createGallery(projects); // creer la gallerie des projets

// recuperation et verification de quelle bouton a ete presser
// changement des classe pour l'affichage
const btnFilter = document.querySelectorAll("div.filter button");
btnFilter.forEach((btn) => {
    btn.addEventListener("click", () => {
        for (let i = 0; i < btnFilter.length; i++) {
            btnFilter[i].classList.remove("active");
        }
        btn.classList.toggle("active");
        filterByCategories(btn, projects); // met a jour la galerie selon le filtre
    });
});

const editModeElement = document.querySelectorAll(".edit-mode");

if (localStorage.getItem("auth")) {
    editModeElement.forEach((elem) => {
        elem.classList.remove("edit-mode");
    });
}
