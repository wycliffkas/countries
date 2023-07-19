import React, { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./index.module.css";
import { formatPopulation } from "../../utils";
import { ThemeContext } from "../../context/ThemeContext";

interface CardProps {
	officialName: string;
	commonName: string;
	population: number;
	region: string;
	capital: string;
	flag: string;
}

const Card: React.FC<CardProps> = ({
	officialName,
	commonName,
	population,
	region,
	capital,
	flag
}) => {
	const navigate = useNavigate();

	const handleOnCountryClick = useCallback(
		(countryName: string) => {
			navigate(`/country/${countryName}`);
		},
		[navigate]
	);

	const { theme } = useContext(ThemeContext);

	return (
		<div
			className={`${styles.gridItem} ${theme === "dark" ? styles.dark : ""}`}
			onClick={() => handleOnCountryClick(commonName)}
			data-testid="country-card">
			<img src={flag} alt="Country Flag" />
			<div className={styles.countryDetails}>
				<h3>{officialName}</h3>
				<p>
					<strong>Population: </strong>
					{formatPopulation(population)}
				</p>
				<p>
					<strong>Region: </strong>
					{region}
				</p>
				<p>
					<strong>Capital: </strong>
					{capital}
				</p>
			</div>
		</div>
	);
};

export default Card;
