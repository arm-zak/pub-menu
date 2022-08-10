import {activeCategory, activeSubcategory, categories, subcategories} from "../stores";
import {get} from "svelte/store";

export function updateActiveSubcategory(){
    const updatedActiveSubcategory = get(subcategories).filter(subcategory =>
        subcategory.categoryId === get(activeCategory)
    ).find(element => element.inView)?.id
    activeSubcategory.set(updatedActiveSubcategory || '')
    const element: HTMLElement | null = document.getElementById('nav-subcategory-' + updatedActiveSubcategory);
    if (element) {
        element.scrollIntoView({block: "nearest"})
    }
}

export function updateActiveCategory(){
    const updatedActiveCategory = get(categories).find(element => element.inView)?.id
    activeCategory.set(updatedActiveCategory || '')
    const element: HTMLElement | null = document.getElementById('nav-category-' + updatedActiveCategory);
    if (element) {
        element.scrollIntoView({block: "nearest"})
    }
}