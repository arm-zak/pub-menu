import { writable } from 'svelte/store';
import type { coordinate, Website } from './interfaces/Website';
import type { Category } from './interfaces/Category';
import type { Item } from './interfaces/Item';
import type { Subcategory } from './interfaces/Subcategory';
// export let website: any;
// export let categories;
// export let subcategories;
// export let items;
export const website = writable<Website>({});
export const categories = writable<Array<Category>>([]);
export const subcategories = writable<Array<Subcategory>>([]);
export const items = writable<Array<Item>>([]);
export const activeCategory = writable('');
export const activeSubcategory = writable('');
export const coordinates = writable<Array<coordinate>>([]);
export const askLocationButtonVisible = writable(false);
export const alcoholPricesVisible = writable(false);
export const itemDialogVisible = writable(false);
export const itemDialogItem = writable<Item>({})
export const itemDialogCategory = writable<Category>({shownAttributes:[]})
