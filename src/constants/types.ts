export interface Country {
	flags: {
		png: string;
		svg: string;
		alt: string;
	};
	name: {
		common: string;
		official: string;
		nativeName?: {
			[key: string]: {
				official: string;
				common: string;
			};
		};
	};
	capital: string[];
	region: string;
	population: number;
}

export interface DetailedCountry {
	flags: {
		png: string;
		svg: string;
		alt: string;
	};
	name: {
		common: string;
		official: string;
		nativeName?: {
			[key: string]: {
				official: string;
				common: string;
			};
		};
	};
	region: string;
	subregion: string;
	population: number;
	capital: string[];
	borders: string[];
	tld: string[];
	currencies: Currency;
	languages: Language;
}

export interface Currency {
	[key: string]: {
		name: string;
		symbol: string;
	};
}

export interface Language {
	[key: string]: string;
}
