import { createGallery } from "./gallery.js";

const response = await fetch("http://localhost:5678/api/works");
const projects = await response.json();

const galleryContainer = document.querySelector("div.gallery");

createGallery(galleryContainer, projects);
