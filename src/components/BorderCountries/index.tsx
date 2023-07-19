import React, { useEffect, useState, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { API_BASE_URL_V2 } from "../../constants/index";
import styles from "./index.module.css";
import { ThemeContext } from "../../context/ThemeContext";

export interface BorderCountriesProps {
	countryCodes: string[];
}

const BorderCountries: React.FC<BorderCountriesProps> = ({ countryCodes }) => {
	const [countries, setCountries] = useState<String[]>([]);
	const [isMounted, setIsMounted] = useState(true);
	const [isLoading, setLoading] = useState(false);

	const navigate = useNavigate();

  const { theme } = useContext(ThemeContext);

	const handleOnCountryClick = useCallback(
		(countryName: string) => {
			navigate(`/country/${countryName}`);
		},
		[navigate]
	);

	useEffect(() => {
		const getBorderCtryFullName = async () => {
			try {
				setLoading(true);
				const promises = countryCodes.map(async (code) => {
					const response = await fetch(`${API_BASE_URL_V2}/alpha/${code}`);
					const data = await response.json();
					return data.name;
				});

				Promise.all(promises).then((countryNames) => {
					if (isMounted) {
						setCountries(countryNames);
						setLoading(false);
					}
				});
			} catch (error) {
				if (isMounted) {
					setLoading(false);
				}
				console.error("Error fetching country details:", error);
			}
		};

		getBorderCtryFullName();

		return () => setIsMounted(false);
	}, [isMounted, countryCodes]);

	if (isLoading) {
		return <div className={styles.centerText}>Loading Border countries...</div>;
	}

	return (
		<div>
			{countries.map((countryName, index) => (
				<button
					key={index}
					className={`${styles.borderCountry} ${theme === "dark" ? styles.dark : ""}`}
					onClick={() => handleOnCountryClick(countryName.toString())}>
					{countryName}
				</button>
			))}
		</div>
	);
};

export default BorderCountries;
