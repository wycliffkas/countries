import React, { useContext } from "react";

import styles from "./index.module.css";
import { ThemeContext } from "../../context/ThemeContext";

interface SearchFieldProps {
	searchValue: string;
	handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchField: React.FC<SearchFieldProps> = ({
	searchValue,
	handleSearchChange
}) => {
	const { theme } = useContext(ThemeContext);

	return (
		<div className={`${styles.searchContainer} ${theme === "dark" ? styles.dark : ""}`}>
			<i className="fas fa-search"></i>
			<input
				type="text"
				className={`${styles.searchInput} ${theme === "dark" ? styles.dark : ""}`}
				placeholder="Search for a country..."
				value={searchValue}
				onChange={handleSearchChange}
				aria-label="Search"
			/>
		</div>
	);
};

export default SearchField;
