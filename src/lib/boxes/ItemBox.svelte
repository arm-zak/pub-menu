<script lang="ts">
	import type { Item } from '../interfaces/Item';
	import type { Category } from '../interfaces/Category';
	import {
		alcoholPricesVisible,
		askLocationButtonVisible,
		itemDialogCategory,
		itemDialogItem,
		itemDialogVisible
	} from '../stores.js';
	import { errorHandler, showLocation } from '../util/geolocation.js';

	export let category: Category;
	export let item: Item;

	function openItemInfo() {
		itemDialogItem.set(item);
		itemDialogCategory.set(category);
		itemDialogVisible.set(true);
	}
</script>

<div class="relative w-full lg:w-1/2 2xl:w-1/3">
	{#if !item.inStock}
		<h3 class="text-red-600 mx-auto left-0 right-0 text-center top-10 absolute text-3xl font-bold">
			SOLD OUT
		</h3>
	{/if}
	<div
		class:sold-out={!item.inStock}
		class="my-1 h-32 py-1 px-2 border-0 lg:border border-slate-300 lg:shadow-md lg:mx-1 lg:rounded"
	>
		<div class="h-3/4 grow w-full flex flex-row">
			<div class="grow flex flex-col">
				<p class="font-bold line-clamp-1">{item.title}</p>
				<div class="flex flex-row items-center ">
					{#if category.shownAttributes.includes('Country') && item.countryOrigin}
						<span class={'h-[15px] mr-2 w-[20px] fi fi-' + item.countryOrigin.toLowerCase()} />
					{/if}
					{#if category.shownAttributes.includes('Alcohol rate') && item.alcoholRate != null}
						<p class="mr-2 pt-0.5">{item.alcoholRate}%</p>
					{/if}
					{#if item.type}
						<p class="line-clamp-1 pt-0.5">{item.type}</p>
					{/if}
				</div>
				{#if item.description}
					<p class="text-gray-600 text-sm line-clamp-2">{item.description}</p>
				{/if}
			</div>
			{#if item.imageUrl}
				<div class="ml-1 w-20 flex items-center justify-center shrink-0">
					<img
						class="max-h-full"
						src={'https:' + item.imageUrl + '?w=80&h=80&fm=webp'}
						alt="Item"
					/>
				</div>
			{/if}
		</div>
		<div class="w-full gap-x-2.5 h-1/4 flex flex-row mt-auto items-center">
			<div class="grow ">
				{#if category.shownAttributes.includes('Prices') && item.price1 && category.isAlcohol && $askLocationButtonVisible}
					<button
						class="bg-gray-100 p-1 text-xs rounded-lg shadow"
						on:click={() => navigator.geolocation.getCurrentPosition(showLocation, errorHandler)}
						>Get prices</button
					>
				{/if}
				{#if (category.shownAttributes.includes('Prices') && item.price1 && !category.isAlcohol) || (category.shownAttributes.includes('Prices') && item.price1 && category.isAlcohol && $alcoholPricesVisible)}
					<p class="font-bold">{item.price1 + ' ' + category.priceLabel}</p>
				{/if}
			</div>
			{#if category.shownAttributes.includes('House wine tags') && item.isHouseWine}
				<div
					class="group flex flex-row items-center justify-center bg-gray-400 rounded-full w-6 hover:px-2 hover:w-max h-6 shadow text-black"
				>
					<i class=" fa-solid fa-house text-[13px]" />
					<p class="pl-1 text-xs hidden group-hover:block">House wine</p>
				</div>
			{/if}
			{#if category.shownAttributes.includes('Vegan tags') && item.vegan === 'Yes'}
				<div
					class="group flex flex-row items-center justify-center bg-green-700 rounded-full w-6 hover:px-2 hover:w-max h-6 shadow text-black"
				>
					<i class="fa-solid fa-leaf text-[13px]" />
					<p class="pl-1 text-xs hidden group-hover:block">Vegan</p>
				</div>
			{/if}
			{#if category.shownAttributes.includes('Vegetarian tags') && item.vegetarian === 'Yes'}
				<div
					class="group flex flex-row items-center justify-center bg-green-400 rounded-full w-6 hover:px-2 hover:w-max h-6 shadow text-black"
				>
					<i class=" fa-solid fa-seedling text-[13px]" />
					<p class="pl-1 text-xs hidden group-hover:block">Vegetarian</p>
				</div>
			{/if}
			{#if category.shownAttributes.includes('Gluten free tags') && item.glutenFree === 'Yes'}
				<div
					class="relative group flex flex-row items-center justify-center bg-amber-300 rounded-full w-6 hover:px-2 hover:w-max h-6 shadow text-black"
				>
					<i class=" fa-solid fa-slash text-[14px] absolute z-10 m-1 group-hover:m-1.5 left-0" />
					<i class=" fa-solid fa-wheat-awn text-[13px]" />
					<p class="pl-1 text-xs hidden group-hover:block">Gluten free</p>
				</div>
			{/if}
			{#if category.shownAttributes.includes('Vegan tags') && item.vegan === 'Optional'}
				<div
					class="group flex flex-row items-center justify-center bg-green-700/25 rounded-full w-6 hover:px-2 hover:w-max h-6 shadow text-black"
				>
					<i class="  fa-solid fa-leaf text-[13px]" />
					<p class="pl-1 text-xs hidden group-hover:block">Vegan option available</p>
				</div>
			{/if}
			{#if category.shownAttributes.includes('Vegetarian tags') && item.vegetarian === 'Optional'}
				<div
					class="group flex flex-row items-center justify-center bg-green-400/25 rounded-full w-6 hover:px-2 hover:w-max h-6 shadow text-black"
				>
					<i class=" fa-solid fa-seedling text-[13px]" />
					<p class="pl-1 text-xs hidden group-hover:block">Vegetarian available</p>
				</div>
			{/if}
			{#if category.shownAttributes.includes('Gluten free tags') && item.glutenFree === 'Optional'}
				<div
					class="relative group flex flex-row items-center justify-center bg-amber-300/25 rounded-full w-6 hover:px-2 hover:w-max h-6 shadow text-black"
				>
					<i class=" fa-solid fa-slash text-[14px] absolute z-10 ml-1 group-hover:ml-1 left-0" />
					<i class=" line-through decoration-2 fa-solid fa-wheat-awn text-[13px]" />
					<p class="pl-1 text-xs hidden group-hover:block">Gluten free option available</p>
				</div>
			{/if}
			<div class="flex flex-row items-center gap-x-1">
				{#if category.shownAttributes.includes('Untappd info') && item.untappdUrl}
					<a
						target="_blank"
						class="p-2 rounded bg-cover border border-slate-400"
						style="background-image: url('icons/Untappd.svg')"
						aria-label="Untappd"
						href={item.untappdUrl}
					/>
					<p class="pt-0.5">{item.untappdRating ? item.untappdRating.toFixed(1) : 'N/A'}</p>
				{/if}
			</div>
			<button
				aria-label="info"
				class="flex flex-row items-center justify-center bg-black rounded-full w-6 h-6 shadow text-white"
				on:click={openItemInfo}
			>
				<i class="fa-solid fa-info text-[13px]" />
			</button>
		</div>
	</div>
</div>

<style>
	.sold-out {
		filter: blur(2px);
	}
</style>
