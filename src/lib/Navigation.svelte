<script lang="ts">
    import {colord} from "colord";
    import CategoryButton from './nav-buttons/CategoryButton.svelte';
    import SubcategoryButton from './nav-buttons/SubcategoryButton.svelte';
    import {activeCategory, categories, items, subcategories, website} from './stores.js';

</script>

<nav style="background-color: {colord($website.color1).toRgbString()}"
     class="flex flex-row sticky h-12 top-0 overflow-x-scroll overflow-y-hidden shadow-lg z-20">
    {#each $categories as category (category.id)}
        <CategoryButton category={category}/>
    {/each}
</nav>

<nav style="background-color: {colord($website.color1).darken(0.1).toRgbString()}"
     class="flex flex-row sticky h-12 top-12 overflow-x-scroll overflow-y-hidden shadow-lg z-10">
    {#each $subcategories.filter(subcategory =>
        subcategory.categoryId === $activeCategory) as subcategory (subcategory.id)}
        <SubcategoryButton subcategory={subcategory}/>
    {/each}
</nav>

<style>

    nav::-webkit-scrollbar {
        display: none;
    }


</style>