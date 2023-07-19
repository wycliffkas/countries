import React, { useContext } from "react";

import { regions } from "../../constants/index";
import styles from "./index.module.css";
import { ThemeContext } from "../../context/ThemeContext";

interface FilterFieldProps {
	filterValue: string;
	handleFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FilterField: React.FC<FilterFieldProps> = ({ handleFilterChange }) => {
	const { theme } = useContext(ThemeContext);

	return (
		<select
			name="filterValue"
			aria-label="Filter By"
			className={`${styles.select} ${theme === "dark" ? styles.dark : ""}`}
			onChange={handleFilterChange}>
			<option value="">Filter by Region</option>
			{regions.map(({ name }) => (
				<option
					value={name}
					key={name}
					className={`${styles.option} ${styles[theme]}`}>
					{name}
				</option>
			))}
		</select>
	);
};

export default FilterField;
