export interface Item {
	id?: string;
	title?: string;
	categoryId?: string;
	subcategoryId?: string;
	imageUrl?: string;
	type?: string;
	producer?: string;
	description?: string;
	orderImportance?: number;
	inStock?: boolean;
	new?: boolean;
	alcoholRate?: number;
	ibu?: boolean;
	countryOrigin?: string;
	regionOrigin?: string;
	vegan?: string;
	vegetarian?: string;
	glutenFree?: string;
	isHouseWine?: boolean;
	untappdUrl?: string;
	untappdRating?: number;
	price1?: number;
	price2?: number;
	price3?: number;
	price4?: number;
	price5?: number;
	priceLabel1?: string;
	priceLabel2?: string;
	priceLabel3?: string;
	priceLabel4?: string;
	priceLabel5?: string;
}

export function mapContentfulItem(contentfulObject: any): Item {
	return {
		id: contentfulObject.sys.id,
		title: contentfulObject.fields.title,
		categoryId: contentfulObject.fields.category.sys.id,
		subcategoryId: contentfulObject.fields.subcategory
			? contentfulObject.fields.subcategory.sys.id
			: null,
		imageUrl: contentfulObject.fields.image ? contentfulObject.fields.image.fields.file.url : null,
		type: contentfulObject.fields.type,
		producer: contentfulObject.fields.producer,
		description: contentfulObject.fields.description,
		orderImportance: contentfulObject.fields.orderImportance,
		inStock: contentfulObject.fields.inStock,
		new: contentfulObject.fields.new,
		alcoholRate: contentfulObject.fields.alcoholRate,
		ibu: contentfulObject.fields.ibu,
		countryOrigin: contentfulObject.fields.countryOrigin,
		regionOrigin: contentfulObject.fields.regionOrigin,
		vegan: contentfulObject.fields.vegan,
		vegetarian: contentfulObject.fields.vegetarian,
		glutenFree: contentfulObject.fields.glutenFree,
		isHouseWine: contentfulObject.fields.isHouseWine,
		untappdUrl: contentfulObject.fields.untappdUrl,
		untappdRating: contentfulObject.fields.untappdRating,
		price1: contentfulObject.fields.price1,
		price2: contentfulObject.fields.price2,
		price3: contentfulObject.fields.price3,
		price4: contentfulObject.fields.price4,
		price5: contentfulObject.fields.price5,
		priceLabel1: contentfulObject.fields.priceLabel1,
		priceLabel2: contentfulObject.fields.priceLabel2,
		priceLabel3: contentfulObject.fields.priceLabel3,
		priceLabel4: contentfulObject.fields.priceLabel4,
		priceLabel5: contentfulObject.fields.priceLabel5
	};
}
