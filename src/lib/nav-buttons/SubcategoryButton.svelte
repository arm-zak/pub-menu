<script lang="ts">
	import { activeSubcategory } from '../stores';
	import type { Subcategory } from '../interfaces/Subcategory';

	export let subcategory: Subcategory;
	let button: HTMLButtonElement;

	function scrollIntoView() {
		const yOffset = -96;
		const element: HTMLElement = document.getElementById('subcategory-' + subcategory.id);
		const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
		window.scrollTo({ top: y });
	}
</script>

<button
	id={'nav-subcategory-' + subcategory.id}
	bind:this={button}
	class:active-tab={$activeSubcategory === subcategory.id}
	class="duration-300 whitespace-nowrap text-white py-3.5 px-4"
	on:click={() => scrollIntoView()}
	>{subcategory.title}
</button>

<style>
	.active-tab {
		background-color: white;
		color: black;
	}
</style>
