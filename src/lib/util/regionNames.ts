const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

export function getCountry(countryCode: string) {
	switch (countryCode) {
		case 'GB-ENG':
			return 'England';
		case 'GB-SCT':
			return 'Scotland';
		case 'GB-NIR':
			return 'Northern Ireland';
		case 'GB-WLS':
			return 'Wales';
		default:
			return regionNames.of(countryCode);
	}
}
