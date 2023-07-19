import { formatPopulation, getCurrencyNames, getLanguages } from "./index";

describe("Utils", () => {
	it("should correctly formats population", () => {
		const population = 1234567;
		const formattedPopulation = formatPopulation(population);

		expect(formattedPopulation).toEqual("1,234,567");
	});

	it("should correctly return currencies", () => {
		const currencies = {
			EUR: {
				name: "Euro",
				symbol: "€"
			},
			USD: {
				name: "USD",
				symbol: "$"
			}
		};

		const formattedCurrencies = getCurrencyNames(currencies);
		expect(formattedCurrencies).toEqual("Euro, USD");
	});

	it("should correctly return languages", () => {
		const languages = {
			eng: "English",
			zho: "Chinese"
		};

		const formattedLanguages = getLanguages(languages);
		expect(formattedLanguages).toEqual("English, Chinese");
	});
});
