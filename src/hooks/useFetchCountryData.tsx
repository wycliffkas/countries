import { useState, useEffect } from "react";

import { Country, DetailedCountry } from "../constants/types";
import { API_BASE_URL_V3 } from "../constants";

export function useFetchCountryData(countryName?: string): {
	countries: Country[];
	country: DetailedCountry | null;
	isLoading: boolean;
} {
	const [countries, setCountries] = useState<Country[]>([]);
	const [country, setCountry] = useState<DetailedCountry | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let isMounted = true;

		const fetchData = async () => {
			try {
				setIsLoading(true);
				const url = countryName
					? `${API_BASE_URL_V3}/name/${countryName}?fields=name,flags,region,subregion,capital,population,tld,currencies,borders,languages`
					: `${API_BASE_URL_V3}/all?fields=name,flags,region,capital,population`;

				const response = await fetch(url);
				const data = await response.json();

				if (isMounted) {
					if (countryName) {
						setCountry(data[0]);
					} else {
						setCountries(data);
					}
					setIsLoading(false);
				}
			} catch (error) {
				setIsLoading(false);
				console.error("Error fetching data:", error);
			}
		};

		fetchData();

		return () => {
			isMounted = false;
		};
	}, [countryName]);

	return { countries, country, isLoading };
}
