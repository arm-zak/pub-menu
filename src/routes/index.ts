import { createClient } from 'contentful';
import type { ContentfulClientApi } from 'contentful';
import { mapContentfulWebsite } from '../lib/interfaces/Website';
import { mapContentfulCategory } from '../lib/interfaces/Category';
import { mapContentfulSubcategory } from '../lib/interfaces/Subcategory';
import { mapContentfulItem } from '../lib/interfaces/Item';
import type { Category } from '../lib/interfaces/Category';
import type { Item } from '../lib/interfaces/Item';
import type { Subcategory } from '../lib/interfaces/Subcategory';
import type { Website } from '../lib/interfaces/Website';

export async function get() {
	const categories: Array<Category> = [];
	const subcategories: Array<Subcategory> = [];
	const items: Array<Item> = [];
	const client: ContentfulClientApi = createClient({
		space: import.meta.env.VITE_CONTENTFUL_SPACE,
		accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN
	});
	const websiteEntries = await client.getEntries({ content_type: 'siteSettings' });
	const categoryEntries = await client.getEntries({ content_type: 'category' });
	const subcategoryEntries = await client.getEntries({ content_type: 'subcategory' });
	const itemEntries = await client.getEntries({ limit: 1000, content_type: 'item' });
	const website: Website = mapContentfulWebsite(websiteEntries.items[0].fields);
	categoryEntries.items.forEach((element) => categories.push(mapContentfulCategory(element)));
	subcategoryEntries.items.forEach((element) =>
		subcategories.push(mapContentfulSubcategory(element))
	);
	itemEntries.items.forEach((element) => items.push(mapContentfulItem(element)));
	return {
		status: 200,
		body: {
			websiteResponse: website,
			categoriesResponse: categories,
			subcategoriesResponse: subcategories,
			itemsResponse: items
		}
	};
}
