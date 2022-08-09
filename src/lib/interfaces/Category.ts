export interface Category {
	id?: string;
	title?: string;
	description?: string;
	orderImportance?: number;
	priceLabel?: string;
	isAlcohol?: boolean;
	shownAttributes?: Array<string>;
	inView?: boolean;
}

export function mapContentfulCategory(contentfulObject: any): Category {
	return {
		id: contentfulObject.sys.id,
		title: contentfulObject.fields.title,
		description: contentfulObject.fields.description,
		orderImportance: contentfulObject.fields.orderImportance,
		priceLabel: contentfulObject.fields.priceLabel,
		isAlcohol: contentfulObject.fields.isAlcohol,
		shownAttributes: contentfulObject.fields.shownAttributes ? contentfulObject.fields.shownAttributes : [],
		inView: false
	};
}
