<script lang="ts">
  import {inview} from 'svelte-inview';
  import { activeCategory, activeSubcategory, subcategories } from '../stores.js';
  import type { Subcategory } from '../interfaces/Subcategory';
  export let subcategory : Subcategory;
  const inViewOptions = {
    rootMargin: '-96px 0px 0px 0px'
  }

  function onViewChange(event: any) {
    updateSubcategories(event.detail.inView)
    updateActiveSubcategory()
  }

  function updateSubcategories(inView : boolean) {
    const updatedSubcategories =
      $subcategories.map(obj => obj.id === subcategory.id ?
        {...obj, inView} : obj);
    subcategories.set(updatedSubcategories)
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

<div class="py-2 my-2"
     id={"subcategory-"+subcategory.id} use:inview={inViewOptions} on:change={onViewChange}>
  <div class="w-full">
    <h3 class="text-lg font-bold mx-2 text-gray-500">{subcategory.title}</h3>
    {#if subcategory.description}
      <p class="my-2 text-sm mx-2 whitespace-pre-line">{subcategory.description}</p>
    {/if}
  </div>
  <div class="flex flex-wrap border-y-2 divide-y-2 lg:border-y-0 lg:divide-y-0 divide-slate-200">
  <slot name="subcategory-items"></slot>
  </div>
</div>
