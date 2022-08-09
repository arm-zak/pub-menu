export function sortDescending(a: { orderImportance: number }, b: { orderImportance: number }) {
	return b.orderImportance - a.orderImportance;
}
