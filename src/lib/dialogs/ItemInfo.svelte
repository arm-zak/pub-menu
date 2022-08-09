<script lang='ts'>
	import Dialog, {
		Header,
		Title,
		Content
	} from '@smui/dialog';
	import IconButton from '@smui/icon-button';
	import { getCountry } from '../util/regionNames.js';
	import {
		itemDialogVisible,
		itemDialogCategory,
		itemDialogItem,
		askLocationButtonVisible,
		alcoholPricesVisible
	} from '../stores.js';
	import { getLocation } from '../util/geolocation.js';


</script>

<Dialog
	bind:open={$itemDialogVisible}
	fullscreen
	style='z-index: 30'
>
	<Header>
		<Title style='flex-shrink: 1'>{$itemDialogItem.title}</Title>
<!--		<IconButton action='close' ><i class="fa-solid fa-xmark w-10 text-[20px]"></i></IconButton>-->
		<IconButton action='close' class='material-icons'>close</IconButton>
	</Header>
	<Content style='padding: 0; padding-bottom: 20px'>
		{#if $itemDialogItem.imageUrl}
			<div class='w-full h-36 mb-4 flex items-center justify-center shrink-0'>
				<img class='max-h-full' src={"https:"+$itemDialogItem.imageUrl + '?h=150&fm=webp'} alt='Item'>
			</div>
		{/if}
		<div class='flex flex-col my-1 gap-y-1 items-center'>
			{#if $itemDialogCategory.shownAttributes.includes("House wine tags") && $itemDialogItem.isHouseWine}
				<div
					class='flex flex-row items-center justify-center bg-gray-400 rounded-full w-max px-2 h-6 shadow text-black'>
					<i class=' fa-solid fa-house text-[13px]'></i>
					<p class='pl-1 text-xs'>House wine</p>
				</div>
			{/if}
			{#if $itemDialogCategory.shownAttributes.includes("Vegan tags") && $itemDialogItem.vegan === "Yes"}
				<div class='flex flex-row items-center justify-center bg-green-700 rounded-full px-2 h-6 shadow text-black'>
					<i class=' fa-solid fa-leaf text-[13px]'></i>
					<p class='pl-1 text-xs'>Vegan</p>
				</div>
			{/if}
			{#if $itemDialogCategory.shownAttributes.includes("Vegetarian tags") && $itemDialogItem.vegetarian === "Yes"}
				<div class='flex flex-row items-center justify-center bg-green-400 rounded-full px-2 h-6 shadow text-black'>
					<i class='fa-solid fa-seedling text-[13px]'></i>
					<p class='pl-1 text-xs'>Vegetarian</p>
				</div>
			{/if}
			{#if $itemDialogCategory.shownAttributes.includes("Gluten free tags") && $itemDialogItem.glutenFree === "Yes"}
				<div class=' flex flex-row items-center justify-center bg-amber-300 rounded-full px-2 h-6 shadow text-black'>
					<i class=' line-through decoration-2 fa-solid fa-wheat-awn text-[13px]'></i>
					<p class='pl-1 text-xs'>Gluten free</p>
				</div>
			{/if}
			{#if $itemDialogCategory.shownAttributes.includes("Vegan tags") && $itemDialogItem.vegan === "Optional"}
				<div class='flex flex-row items-center justify-center bg-green-700/25 rounded-full px-2 h-6 shadow text-black'>
					<i class=' fa-solid fa-leaf text-[13px]'></i>
					<p class='pl-1 text-xs'>Vegan option available</p>
				</div>
			{/if}
			{#if $itemDialogCategory.shownAttributes.includes("Vegetarian tags") && $itemDialogItem.vegetarian === "Optional"}
				<div class='flex flex-row items-center justify-center bg-green-400/25 rounded-full px-2 h-6 shadow text-black'>
					<i class=' fa-solid fa-seedling text-[13px]'></i>
					<p class='pl-1 text-xs'>Vegetarian available</p>
				</div>
			{/if}
			{#if $itemDialogCategory.shownAttributes.includes("Gluten free tags") && $itemDialogItem.glutenFree === "Optional"}
				<div class='flex flex-row items-center justify-center bg-amber-300/25 rounded-full px-2 h-6 shadow text-black'>
					<i class=' line-through decoration-2 fa-solid fa-wheat-awn text-[13px]'></i>
					<p class='pl-1 text-xs'>Gluten free option available</p>
				</div>
			{/if}
		</div>
		<table class='w-full text-slate-900'>
			{#if $itemDialogCategory.shownAttributes.includes("Type") && $itemDialogItem.type}
				<tr class='even:bg-slate-50'>
					<th class='px-2'>Type</th>
					<td class='py-1'>{$itemDialogItem.type}</td>
				</tr>
			{/if}
			{#if $itemDialogCategory.shownAttributes.includes("Producer") && $itemDialogItem.producer}
				<tr class='even:bg-slate-50'>
					<th class='px-2'>Producer</th>
					<td class='py-1'>{$itemDialogItem.producer}</td>
				</tr>
			{/if}
			{#if $itemDialogCategory.shownAttributes.includes("Alcohol rate") && $itemDialogItem.alcoholRate != null}
				<tr class='even:bg-slate-50'>
					<th class='px-2'>ABV</th>
					<td class='py-1'>{$itemDialogItem.alcoholRate}%</td>
				</tr>
			{/if}
			{#if $itemDialogCategory.shownAttributes.includes("IBU") && $itemDialogItem.ibu != null}
				<tr class='even:bg-slate-50'>
					<th class='px-2'>IBU</th>
					<td class='py-1'>{$itemDialogItem.ibu}</td>
				</tr>
			{/if}
			{#if $itemDialogCategory.shownAttributes.includes("Country") && $itemDialogItem.countryOrigin}
				<tr class='even:bg-slate-50'>
					<th class='px-2'>Origin</th>
					<td class='py-1'>{getCountry($itemDialogItem.countryOrigin)}</td>
				</tr>
			{/if}
			{#if $itemDialogItem.description}
				<tr class='even:bg-slate-50 '>
					<th class='px-2'>Description</th>
					<td class='py-1 whitespace-pre-line '>{$itemDialogItem.description}</td>
				</tr>
			{/if}
			{#if $itemDialogCategory.shownAttributes.includes("Untappd info") && $itemDialogItem.untappdRating}
				<tr class='even:bg-slate-50 '>
					<th class='px-2'>Untappd rating</th>
					<td class='py-1'>{$itemDialogItem.untappdRating.toFixed(2)}</td>
				</tr>
			{/if}
			{#if $itemDialogCategory.shownAttributes.includes("Untappd info") && $itemDialogItem.untappdUrl}
				<tr class='even:bg-slate-50'>
					<th class='px-2'>Untappd URL</th>
					<td class='py-1'>
						<a class='text-blue-600 hover:text-blue-800 visited:text-purple-600 '
							 target='_blank' href={$itemDialogItem.untappdUrl}>{$itemDialogItem.untappdUrl}</a>
					</td>
				</tr>
			{/if}
			{#if $itemDialogCategory.shownAttributes.includes("Prices") && $itemDialogItem.price1}
				<tr class='even:bg-slate-50'>
					<th class='px-2'>Price</th>
					<td class='py-1'>
						{#if $itemDialogCategory.isAlcohol && $askLocationButtonVisible}
							<button class='bg-gray-100 p-1 text-xs rounded-lg shadow' on:click={getLocation}>Get prices</button>
						{/if}
						{#if (!$itemDialogCategory.isAlcohol) ||
						(!$itemDialogCategory.isAlcohol && $alcoholPricesVisible)}
							<p>{$itemDialogItem.priceLabel1 ? $itemDialogItem.priceLabel1 + ": " : ""}  {$itemDialogItem.price1} {$itemDialogCategory.priceLabel}</p>
							{#if $itemDialogItem.price2}
								<p>{$itemDialogItem.priceLabel2 ? $itemDialogItem.priceLabel2 + ": " : ""}  {$itemDialogItem.price2} {$itemDialogCategory.priceLabel}</p>
							{/if}
							{#if $itemDialogItem.price3}
								<p>{$itemDialogItem.priceLabel3 ? $itemDialogItem.priceLabel3 + ": " : ""}  {$itemDialogItem.price3} {$itemDialogCategory.priceLabel}</p>
							{/if}
							{#if $itemDialogItem.price4}
								<p>{$itemDialogItem.priceLabel4 ? $itemDialogItem.priceLabel4 + ": " : ""}  {$itemDialogItem.price4} {$itemDialogCategory.priceLabel}</p>
							{/if}
							{#if $itemDialogItem.price5}
								<p>{$itemDialogItem.priceLabel5 ? $itemDialogItem.priceLabel5 + ": " : ""}  {$itemDialogItem.price5} {$itemDialogCategory.priceLabel}</p>
							{/if}
						{/if}
					</td>
				</tr>
			{/if}

		</table>
	</Content>

</Dialog>