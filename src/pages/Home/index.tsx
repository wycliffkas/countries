import React, { useState, useCallback, useContext } from "react";

import Card from "../../components/Card";
import styles from "./index.module.css";
import SearchField from "../../components/SearchField";
import FilterField from "../../components/FilterField";
import { useFetchCountryData } from "../../hooks/useFetchCountryData";
import { ThemeContext } from "../../context/ThemeContext";

const Home = () => {
	const [searchValue, setSearchValue] = useState("");
	const [filterValue, setFilterValue] = useState("");

	const { countries, isLoading } = useFetchCountryData();

	const { theme } = useContext(ThemeContext);

	const onSearchChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setSearchValue(event.target.value);
		},
		[]
	);

	const onFilterChange = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) => {
			setFilterValue(event.target.value);
		},
		[]
	);

	if (isLoading) {
		return <div className={styles.centerText}>Loading countries...</div>;
	}

	const filteredCountries = countries.filter((country) => {
		const searchTermMatch =
			country.name.official.toLowerCase().includes(searchValue.toLowerCase()) ||
			country.name.common.toLowerCase().includes(searchValue.toLowerCase());
		const regionMatch = filterValue === "" || country.region === filterValue;
		return searchTermMatch && regionMatch;
	});

	return (
		<div
			className={`${styles.container} ${theme === "dark" ? styles.dark : ""}`}>
			<div className={styles.searchWrapper}>
				<SearchField
					searchValue={searchValue}
					handleSearchChange={onSearchChange}
				/>
				<FilterField
					filterValue={filterValue}
					handleFilterChange={onFilterChange}
				/>
			</div>

			<div className={styles.gridContainer}>
				{filteredCountries?.map((country) => (
					<Card
						key={country?.name?.official}
						officialName={country?.name?.official}
						commonName={country?.name?.common}
						population={country?.population}
						region={country?.region}
						capital={country?.capital[0]}
						flag={country?.flags.svg}
					/>
				))}
			</div>
		</div>
	);
};

export default Home;
