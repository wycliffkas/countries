import { Currency, Language } from "../constants/types";

export const getCurrencyNames = (currencies: Currency) => {
	return Object.values(currencies)
		.map((currency) => currency.name)
		.join(", ");
};

export const formatPopulation = (population: number) => {
	if (population === undefined) {
		return;
	}
	return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getLanguages = (languages: Language) => {
	return Object.values(languages).join(", ");
};
