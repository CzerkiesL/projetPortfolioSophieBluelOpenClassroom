import { createGallery } from "./gallery.js";

/*********************************************************
Fonction qui creez un menu de filtre par categories
    param 1: la liste de projet pour recuperer les categorie
*********************************************************/
export async function createFilterMenu(projectList) {
    const filterMenu = document.querySelector("div.filter");

    filterMenu.innerHTML = "";

    let categories = new Set(["Tous"]);

    projectList.forEach((project) => {
        categories.add(project.category.name);
    });

    categories.forEach((categorie) => {
        let filterBtn = document.createElement("button");

        if (categorie === "Tous") {
            filterBtn.classList.add("active");
        }
        filterBtn.classList.add("btn");
        filterBtn.classList.add("btn-filter");
        filterBtn.value = categorie;
        filterBtn.innerText = categorie;
        filterMenu.append(filterBtn);
    });

    const btnFilter = document.querySelectorAll("div.filter button");
    btnFilter.forEach((btn) => {
        btn.addEventListener("click", () => {
            for (let i = 0; i < btnFilter.length; i++) {
                btnFilter[i].classList.remove("active");
            }
            btn.classList.toggle("active");
            filterByCategories(btn, projectList); // met a jour la galerie selon le filtre
        });
    });
}

/*********************************************************
Fonction qui permet de filtre les projet selon leur categorie
    param 1: le bouton sur lequel on a appuyer
    param 2: la liste a filtrer

    return: sois la liste filtrer selon la categorie sois la liste 
               originale si la valeur du filtre est "All"
*********************************************************/
export function filterByCategories(btnPressed, projectList) {
    let valueFilter = btnPressed.value;
    let elementFiltrer = [];

    if (valueFilter !== "Tous") {
        projectList.forEach((project) => {
            if (project.category.name === valueFilter) {
                elementFiltrer.push(project);
            }
        });
        createGallery(elementFiltrer);
    } else {
        createGallery(projectList);
    }
}
