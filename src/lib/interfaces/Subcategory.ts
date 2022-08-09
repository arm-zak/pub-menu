export interface Subcategory {
	id: string;
	title: string;
	categoryId: string;
	description: string;
	orderImportance: number;
	inView: boolean;
}

export function mapContentfulSubcategory(contentfulObject: any): Subcategory {
	return {
		id: contentfulObject.sys.id,
		title: contentfulObject.fields.title,
		categoryId: contentfulObject.fields.category.sys.id,
		description: contentfulObject.fields.description,
		orderImportance: contentfulObject.fields.orderImportance,
		inView: false
	};
}
