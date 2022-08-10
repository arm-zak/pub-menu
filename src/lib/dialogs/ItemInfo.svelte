<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import {
		alcoholPricesVisible,
		askLocationButtonVisible,
		itemDialogCategory,
		itemDialogItem
	} from '../stores.js';
	import { getCountry } from '../util/regionNames.js';
	import { errorHandler, showLocation } from '../util/geolocation.js';

	const dispatch = createEventDispatcher();
	const close = () => dispatch('close');

	let modal;

	const handle_keydown = (e) => {
		if (e.key === 'Escape') {
			close();
			return;
		}

		if (e.key === 'Tab') {
			// trap focus
			const nodes = modal.querySelectorAll('*');
			const tabbable = Array.from(nodes).filter((n) => n.tabIndex >= 0);

			let index = tabbable.indexOf(document.activeElement);
			if (index === -1 && e.shiftKey) index = 0;

			index += tabbable.length + (e.shiftKey ? -1 : 1);
			index %= tabbable.length;

			tabbable[index].focus();
			e.preventDefault();
		}
	};
</script>

<svelte:window on:keydown={handle_keydown} />

<div class="fixed top-0 left-0 w-full h-full z-30 backdrop-brightness-50" on:click={close} />

<div
	class=" md:translate-y-[-50%] md:translate-x-[-50%] overflow-auto fixed z-30 md:top-1/2 md:left-1/2 top-0 left-0 w-screen h-screen
 md:w-[calc(100vw_-_16rem)] md:max-w-6xl md:max-h-[calc(100vh_-_16rem)] px-3 pb-3 bg-white md:rounded-md md:h-fit"
	role="dialog"
	aria-modal="true"
	bind:this={modal}
>
	<div class="w-full flex flex-row-reverse sticky top-0 pt-3 pb-1 z-10 bg-white">
		<button
			aria-label="close"
			class="ml-auto w-8 h-8 flex items-center justify-center"
			on:click={close}
		>
			<i class="fa-solid fa-xmark text-[20px] " />
		</button>
	</div>
	<div class="flex flex-col my-1 gap-y-1 items-center">
		{#if $itemDialogItem.imageUrl}
			<img
				class="h-36 my-2"
				src={'https:' + $itemDialogItem.imageUrl + '?h=150&fm=webp'}
				alt="Item"
			/>
		{/if}
		{#if $itemDialogCategory.shownAttributes.includes('House wine tags') && $itemDialogItem.isHouseWine}
			<div
				class="flex flex-row items-center justify-center bg-gray-400 rounded-full w-max px-2 h-6 shadow text-black"
			>
				<i class=" fa-solid fa-house text-[13px]" />
				<p class="pl-1 text-xs">House wine</p>
			</div>
		{/if}
		{#if $itemDialogCategory.shownAttributes.includes('Vegan tags') && $itemDialogItem.vegan === 'Yes'}
			<div
				class="flex flex-row items-center justify-center bg-green-700 rounded-full px-2 h-6 shadow text-black"
			>
				<i class=" fa-solid fa-leaf text-[13px]" />
				<p class="pl-1 text-xs">Vegan</p>
			</div>
		{/if}
		{#if $itemDialogCategory.shownAttributes.includes('Vegetarian tags') && $itemDialogItem.vegetarian === 'Yes'}
			<div
				class="flex flex-row items-center justify-center bg-green-400 rounded-full px-2 h-6 shadow text-black"
			>
				<i class="fa-solid fa-seedling text-[13px]" />
				<p class="pl-1 text-xs">Vegetarian</p>
			</div>
		{/if}
		{#if $itemDialogCategory.shownAttributes.includes('Gluten free tags') && $itemDialogItem.glutenFree === 'Yes'}
			<div
				class="relative flex flex-row items-center justify-center bg-amber-300 rounded-full px-2 h-6 shadow text-black"
			>
				<i class=" fa-solid fa-slash text-[14px] absolute z-10 ml-1.5 left-0" />
				<i class=" line-through decoration-2 fa-solid fa-wheat-awn text-[13px]" />
				<p class="pl-1 text-xs">Gluten free</p>
			</div>
		{/if}
		{#if $itemDialogCategory.shownAttributes.includes('Vegan tags') && $itemDialogItem.vegan === 'Optional'}
			<div
				class="flex flex-row items-center justify-center bg-green-700/25 rounded-full px-2 h-6 shadow text-black"
			>
				<i class=" fa-solid fa-leaf text-[13px]" />
				<p class="pl-1 text-xs">Vegan option available</p>
			</div>
		{/if}
		{#if $itemDialogCategory.shownAttributes.includes('Vegetarian tags') && $itemDialogItem.vegetarian === 'Optional'}
			<div
				class="flex flex-row items-center justify-center bg-green-400/25 rounded-full px-2 h-6 shadow text-black"
			>
				<i class=" fa-solid fa-seedling text-[13px]" />
				<p class="pl-1 text-xs">Vegetarian available</p>
			</div>
		{/if}
		{#if $itemDialogCategory.shownAttributes.includes('Gluten free tags') && $itemDialogItem.glutenFree === 'Optional'}
			<div
				class="relative flex flex-row items-center justify-center bg-amber-300/25 rounded-full px-2 h-6 shadow text-black"
			>
				<i class=" fa-solid fa-slash text-[14px] absolute z-10 ml-1.5 left-0" />
				<i class=" line-through decoration-2 fa-solid fa-wheat-awn text-[13px]" />
				<p class="pl-1 text-xs">Gluten free option available</p>
			</div>
		{/if}

		<table class="w-full text-slate-900">
			{#if $itemDialogItem.title}
				<tr class="even:bg-slate-50">
					<th class="px-2 py-1 align-top ">Title</th>
					<td class="py-1">{$itemDialogItem.title}</td>
				</tr>
			{/if}
			{#if $itemDialogCategory.shownAttributes.includes('Type') && $itemDialogItem.type}
				<tr class="even:bg-slate-50">
					<th class="px-2 py-1 align-top ">Type</th>
					<td class="py-1">{$itemDialogItem.type}</td>
				</tr>
			{/if}
			{#if $itemDialogCategory.shownAttributes.includes('Producer') && $itemDialogItem.producer}
				<tr class="even:bg-slate-50">
					<th class="px-2 py-1 align-top ">Producer</th>
					<td class="py-1">{$itemDialogItem.producer}</td>
				</tr>
			{/if}
			{#if $itemDialogCategory.shownAttributes.includes('Alcohol rate') && $itemDialogItem.alcoholRate != null}
				<tr class="even:bg-slate-50">
					<th class="px-2 py-1 align-top ">ABV</th>
					<td class="py-1">{$itemDialogItem.alcoholRate}%</td>
				</tr>
			{/if}
			{#if $itemDialogCategory.shownAttributes.includes('IBU') && $itemDialogItem.ibu != null}
				<tr class="even:bg-slate-50">
					<th class="px-2 py-1 align-top ">IBU</th>
					<td class="py-1">{$itemDialogItem.ibu}</td>
				</tr>
			{/if}
			{#if $itemDialogCategory.shownAttributes.includes('Country') && $itemDialogItem.countryOrigin}
				<tr class="even:bg-slate-50">
					<th class="px-2 py-1 align-top ">Origin</th>
					<td class="py-1">{getCountry($itemDialogItem.countryOrigin)}</td>
				</tr>
			{/if}
			{#if $itemDialogItem.description}
				<tr class="even:bg-slate-50 ">
					<th class="px-2 py-1 align-top ">Description</th>
					<td class="py-1 whitespace-pre-line ">{$itemDialogItem.description}</td>
				</tr>
			{/if}
			{#if $itemDialogCategory.shownAttributes.includes('Untappd info') && $itemDialogItem.untappdRating}
				<tr class="even:bg-slate-50 ">
					<th class="px-2 py-1 align-top ">Untappd rating</th>
					<td class="py-1">{$itemDialogItem.untappdRating.toFixed(2)}</td>
				</tr>
			{/if}
			{#if $itemDialogCategory.shownAttributes.includes('Untappd info') && $itemDialogItem.untappdUrl}
				<tr class="even:bg-slate-50">
					<th class="px-2 py-1 align-top ">Untappd URL</th>
					<td class="py-1">
						<a
							class="text-blue-600 hover:text-blue-800 visited:text-purple-600 "
							target="_blank"
							href={$itemDialogItem.untappdUrl}>{$itemDialogItem.untappdUrl}</a
						>
					</td>
				</tr>
			{/if}
			{#if $itemDialogCategory.shownAttributes.includes('Prices') && $itemDialogItem.price1}
				<tr class="even:bg-slate-50">
					<th class="px-2 py-1 align-top ">Price</th>
					<td class="py-1">
						{#if $itemDialogCategory.isAlcohol && $askLocationButtonVisible}
							<button
								class="bg-gray-100 p-1 text-xs rounded-lg shadow"
								on:click={() =>
									navigator.geolocation.getCurrentPosition(showLocation, errorHandler)}
								>Get prices
							</button>
						{/if}
						{#if !$itemDialogCategory.isAlcohol || (!$itemDialogCategory.isAlcohol && $alcoholPricesVisible)}
							<p>
								{$itemDialogItem.priceLabel1 ? $itemDialogItem.priceLabel1 + ': ' : ''}
								{$itemDialogItem.price1}
								{$itemDialogCategory.priceLabel}
							</p>
							{#if $itemDialogItem.price2}
								<p>
									{$itemDialogItem.priceLabel2 ? $itemDialogItem.priceLabel2 + ': ' : ''}
									{$itemDialogItem.price2}
									{$itemDialogCategory.priceLabel}
								</p>
							{/if}
							{#if $itemDialogItem.price3}
								<p>
									{$itemDialogItem.priceLabel3 ? $itemDialogItem.priceLabel3 + ': ' : ''}
									{$itemDialogItem.price3}
									{$itemDialogCategory.priceLabel}
								</p>
							{/if}
							{#if $itemDialogItem.price4}
								<p>
									{$itemDialogItem.priceLabel4 ? $itemDialogItem.priceLabel4 + ': ' : ''}
									{$itemDialogItem.price4}
									{$itemDialogCategory.priceLabel}
								</p>
							{/if}
							{#if $itemDialogItem.price5}
								<p>
									{$itemDialogItem.priceLabel5 ? $itemDialogItem.priceLabel5 + ': ' : ''}
									{$itemDialogItem.price5}
									{$itemDialogCategory.priceLabel}
								</p>
							{/if}
						{/if}
					</td>
				</tr>
			{/if}
		</table>
	</div>
</div>
