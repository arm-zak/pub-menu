import { writable } from 'svelte/store';
import type { Website } from './interfaces/Website';
import type { Category } from './interfaces/Category';
import type { Item } from './interfaces/Item';
import type { Subcategory } from './interfaces/Subcategory';

export const website = writable<Website>({});
export const categories = writable<Array<Category>>([]);
export const subcategories = writable<Array<Subcategory>>([]);
export const items = writable<Array<Item>>([]);
export const activeCategory = writable('');
export const activeSubcategory = writable('');
export const askLocationButtonVisible = writable(false);
export const alcoholPricesVisible = writable(false);
export const itemDialogVisible = writable(false);
export const itemDialogItem = writable<Item>({});
export const itemDialogCategory = writable<Category>({ shownAttributes: [] });
