<script lang="ts">
	import type { Category } from '../interfaces/Category';
	import { activeCategory } from '../stores';

	export let category: Category;
	let button: HTMLButtonElement;

	function scrollIntoView() {
		const yOffset = -96;
		const element: HTMLElement = document.getElementById('category-' + category.id);
		const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
		window.scrollTo({ top: y });
	}
</script>

<button
	id={'nav-category-' + category.id}
	bind:this={button}
	class:active-tab={$activeCategory === category.id}
	class="duration-300 whitespace-nowrap text-white py-3.5 px-4"
	on:click={() => scrollIntoView()}
	>{category.title}
</button>

<style>
	.active-tab {
		background-color: white;
		color: black;
	}
</style>
