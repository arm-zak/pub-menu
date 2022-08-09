export interface Website {
	title?: string;
	description?: string;
	color1?: string;
	color2?: string;
	color3?: string;
	headerImageUrl?: string;
	logoImageUrl?: string;
	footer?: string;
	locationBoundary1?: coordinate;
	locationBoundary2?: coordinate;
	locationBoundary3?: coordinate;
	locationBoundary4?: coordinate;
}

export interface coordinate {
	lon: number;
	lat: number;
}

export function mapContentfulWebsite(contentfulObject: any): Website {
	return {
		title: contentfulObject.title,
		description: contentfulObject.description,
		headerImageUrl: contentfulObject.headerImage
			? contentfulObject.headerImage.fields.file.url
			: null,
		logoImageUrl: contentfulObject.logoImage ? contentfulObject.logoImage.fields.file.url : null,
		color1: contentfulObject.color1,
		color2: contentfulObject.color2,
		color3: contentfulObject.color3,
		footer: contentfulObject.footer,
		locationBoundary1: contentfulObject.locationBoundary1,
		locationBoundary2: contentfulObject.locationBoundary2,
		locationBoundary3: contentfulObject.locationBoundary3,
		locationBoundary4: contentfulObject.locationBoundary4
	};
}
