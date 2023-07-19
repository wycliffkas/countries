import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { formatPopulation, getCurrencyNames, getLanguages } from "../../utils";
import styles from "./index.module.css";
import BorderCountries from "../../components/BorderCountries";
import { useFetchCountryData } from "../../hooks/useFetchCountryData";
import { ThemeContext } from "../../context/ThemeContext";

const CountryDetails = () => {
	const navigate = useNavigate();
	const { countryName } = useParams();

	const { theme } = useContext(ThemeContext);

	const { country, isLoading } = useFetchCountryData(countryName);

	const handleGoBack = () => {
		navigate(-1);
	};

	if (isLoading) {
		return <div className={styles.centerText}>Loading country...</div>;
	}

	return (
		<div
			className={`${styles.detailsContainer} ${
				theme === "dark" ? styles.dark : ""
			}`}>
			<button
				onClick={handleGoBack}
				className={`${styles.backButton} ${
					theme === "dark" ? styles.dark : ""
				}`}>
				<i className="fas fa-arrow-left"></i>Back
			</button>
			<div className={styles.wrapper}>
				<div className={styles.flexItem}>
					<img
						src={country?.flags.svg}
						alt="Country Flag"
						className={styles.detailImage}
					/>
				</div>

				<div className={styles.flexItem2}>
					<h2>{country?.name?.common}</h2>
					<div className={styles.textDetailsWrapper}>
						<div>
							<p>
								<strong>Native Name: </strong>
								{country?.name?.common}
							</p>
							<p>
								<strong>Population: </strong>
								{country?.population ? formatPopulation(country.population) : 0}
							</p>
							<p>
								<strong>Region: </strong>
								{country?.region}
							</p>
							<p>
								<strong>Sub Region: </strong>
								{country?.subregion ? country.subregion : "None"}
							</p>
							<p>
								<strong>Capital: </strong>
								{country?.capital[0] ? country.capital[0] : "None"}
							</p>
						</div>

						<div>
							<p>
								<strong>Top Level Domain: </strong>
								{country?.tld[0]}
							</p>
							<p>
								<strong>Currencies: </strong>
								{country?.currencies
									? getCurrencyNames(country.currencies)
									: "None"}
							</p>
							<p>
								<strong>Languages: </strong>
								{country?.languages ? getLanguages(country.languages) : "None"}
							</p>
						</div>
					</div>
					<div className={styles.borderCountryWrapper}>
						<strong>Border Countries: </strong>
						{!!country?.borders.length ? (
							<BorderCountries countryCodes={country.borders} />
						) : (
							"None"
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CountryDetails;
