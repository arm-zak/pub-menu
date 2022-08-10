
<script lang='ts'>
	import { onMount } from 'svelte';
	import Header from '../lib/Header.svelte';
	import Navigation from '../lib/Navigation.svelte';
	import List from '../lib/List.svelte';
	import Footer from '../lib/Footer.svelte';
	import { categories, coordinates, items, subcategories, website } from '../lib/stores';
	import "../tailwind.css";
	import type { Item } from '../lib/interfaces/Item';
	import type { Subcategory } from '../lib/interfaces/Subcategory';
	import type { Website } from '../lib/interfaces/Website';
	import type { Category } from '../lib/interfaces/Category';
	import { checkGeolocationPermissions } from '../lib/util/geolocation';
	import { sortDescending } from '../lib/util/sortDescending';
	import { GoogleAnalytics } from '@beyonk/svelte-google-analytics'
	import {itemDialogVisible} from "../lib/stores.js";
	import ItemInfo from '../lib/dialogs/ItemInfo.svelte';


	export let websiteResponse : Website;
	export let categoriesResponse: Array<Category>;
	export let subcategoriesResponse: Array<Subcategory>;
	export let itemsResponse : Array<Item>;
	const googleAnalyticsId : string = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
	website.set(websiteResponse)
	categories.set(categoriesResponse.sort(sortDescending).filter(element => itemsResponse.some(obj => obj.categoryId === element.id)))
	subcategories.set(subcategoriesResponse.sort(sortDescending).filter(subcategory => itemsResponse.some(obj => obj.subcategoryId === subcategory.id)))
	items.set(itemsResponse.sort(sortDescending))
	onMount(async () => {
		checkGeolocationPermissions()
	});

</script>

<svelte:head>
	<title>{$website.title} - Online Menu</title>
	<link rel='icon' href={"https:"+$website.logoImageUrl+"?w=16&h=16&fm=webp"} />
	<meta name="description" content={$website.description}>
</svelte:head>

{#if googleAnalyticsId}
	<GoogleAnalytics properties={[ googleAnalyticsId ]} />
{/if}



<Header />
<Navigation />
<List />
<Footer />
{#if $itemDialogVisible}
	<ItemInfo on:close="{() => {itemDialogVisible.set(false)}}">
	</ItemInfo>
{/if}
