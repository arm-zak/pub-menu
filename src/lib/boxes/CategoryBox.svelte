<script lang="ts">
  import { colord } from "colord";
  import {inview} from 'svelte-inview';
  import { activeCategory, activeSubcategory, categories, subcategories } from '../stores';

  import type { Category } from '../interfaces/Category';
  import type { Website } from '../interfaces/Website';
  import {items} from "../stores.js";
  export let website : Website;
  export let category : Category;
  const inViewOptions = {
    rootMargin: '-96px 0px 0px 0px'
  }

  function onViewChange(event: any) {
    updateCategories(event.detail.inView)
    updateActiveCategory()
    updateActiveSubcategory()
  }

  function updateCategories(inView : boolean) {
    const updatedCategories =
      $categories.map(obj => obj.id === category.id ?
        {...obj, inView} : obj);
    categories.set(updatedCategories)
  }

  function updateActiveCategory(){
    const updatedActiveCategory = $categories.find(element => element.inView) ?
      $categories.find(element => element.inView).id : ''
    activeCategory.set(updatedActiveCategory)
    const element: HTMLElement = document.getElementById('nav-category-' + updatedActiveCategory);
    if (element) {
      element.scrollIntoView({block: "nearest"})
    }
  }

  function updateActiveSubcategory(){
    const updatedActiveSubcategory = $subcategories.filter(subcategory =>
      subcategory.categoryId === $activeCategory
    ).find(element => element.inView) ?
      $subcategories.filter(subcategory =>
        subcategory.categoryId === $activeCategory
      ).find(element => element.inView).id : ''
    activeSubcategory.set(updatedActiveSubcategory)
    const element: HTMLElement = document.getElementById('nav-subcategory-' + updatedActiveSubcategory);
    if (element) {
      element.scrollIntoView({block: "nearest"})
    }
  }


</script>

<div class="py-2 bg-white shadow-lg"
     id={"category-"+category.id} use:inview={inViewOptions} on:change={onViewChange}>
  <div>
    <h2 class="text-xl font-bold mx-2 underline underline-offset-8"
        style='text-decoration-color: {colord(website.color2).toRgbString()}'>{category.title}</h2>
    {#if category.description}
      <p class="my-2 text-sm mx-2 whitespace-pre-line">{category.description}</p>
    {/if}
  </div>
  <slot name="subcategories"></slot>
  {#if $items.some(element => element.categoryId === category.id && !element.subcategoryId)}
    <div class="my-4">
    {#if $subcategories.some(element => element.categoryId === category.id)}
    <div class="w-full">
      <h3 class="text-lg font-bold mx-2 text-gray-500">Others</h3>
    </div>
    {/if}
    <div class=" flex flex-wrap divide-y-2 border-b-2 lg:border-b-0 lg:divide-y-0 divide-slate-200">
      <slot name="category-items"></slot>
    </div>
      </div>
  {/if}


</div>