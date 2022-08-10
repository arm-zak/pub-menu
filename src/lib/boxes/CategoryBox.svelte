<script lang="ts">
	import { colord } from 'colord';
	import { inview } from 'svelte-inview';
	import { categories, subcategories } from '../stores';
	import type { Category } from '../interfaces/Category';
	import type { Website } from '../interfaces/Website';
	import { items } from '../stores.js';
	import { updateActiveCategory, updateActiveSubcategory } from '../util/navigation';

	export let website: Website;
	export let category: Category;
	const inViewOptions = {
		rootMargin: '-96px 0px 0px 0px'
	};

	function onViewChange(event: any) {
		updateCategories(event.detail.inView);
		updateActiveCategory();
		updateActiveSubcategory();
	}

	function updateCategories(inView: boolean) {
		const updatedCategories = $categories.map((obj) =>
			obj.id === category.id ? { ...obj, inView } : obj
		);
		categories.set(updatedCategories);
	}
</script>

<div
	class="py-2 bg-white shadow-lg"
	id={'category-' + category.id}
	use:inview={inViewOptions}
	on:change={onViewChange}
>
	<div>
		<h2
			class="text-xl font-bold mx-2 underline underline-offset-8"
			style="text-decoration-color: {colord(website.color2).toRgbString()}"
		>
			{category.title}
		</h2>
		{#if category.description}
			<p class="my-2 text-sm mx-2 whitespace-pre-line">{category.description}</p>
		{/if}
	</div>
	<slot name="subcategories" />
	{#if $items.some((element) => element.categoryId === category.id && !element.subcategoryId)}
		<div class="my-4">
			{#if $subcategories.some((element) => element.categoryId === category.id)}
				<div class="w-full">
					<h3 class="text-lg font-bold mx-2 text-gray-500">Others</h3>
				</div>
			{/if}
			<div
				class=" flex flex-wrap divide-y-2 border-b-2 lg:border-b-0 lg:divide-y-0 divide-slate-200"
			>
				<slot name="category-items" />
			</div>
		</div>
	{/if}
</div>
