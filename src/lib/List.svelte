<script lang="ts">
	import CategoryBox from './boxes/CategoryBox.svelte';
	import SubcategoryBox from './boxes/SubcategoryBox.svelte';
	import ItemBox from './boxes/ItemBox.svelte';
	import { categories, items, subcategories, website } from './stores.js';
</script>

<div class="flex flex-col gap-y-5 bg-slate-100">
	{#each $categories as category (category.id)}
		<CategoryBox website={$website} {category}>
			<svelte:fragment slot="subcategories">
				{#each $subcategories.filter((element) => element.categoryId === category.id) as subcategory (subcategory.id)}
					<SubcategoryBox {subcategory}>
						<svelte:fragment slot="subcategory-items">
							{#each $items.filter((element) => element.categoryId === category.id && element.subcategoryId === subcategory.id) as item (item.id)}
								<ItemBox {item} {category} />
							{/each}
						</svelte:fragment>
					</SubcategoryBox>
				{/each}
			</svelte:fragment>
			<svelte:fragment slot="category-items">
				{#each $items.filter((element) => element.categoryId === category.id && !element.subcategoryId) as item (item.id)}
					<ItemBox {item} {category} />
				{/each}
			</svelte:fragment>
		</CategoryBox>
	{/each}
</div>
