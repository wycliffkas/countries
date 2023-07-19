import React, { useContext } from "react";

import styles from "./index.module.css";
import { ThemeContext, Theme } from "../../context/ThemeContext";

const Navbar = () => {
	const { theme, toggleTheme } = useContext(ThemeContext);

	return (
		<nav className={`${styles.navbar} ${theme === "dark" ? styles.dark : ""}`}>
			<div className={styles.navbarTitle}>Where in the world?</div>
			<button
				className={`${styles.toggleButton} ${
					theme === "dark" ? styles.dark : ""
				}`}
				onClick={toggleTheme}>
				<i className="fa fa-moon"></i>
				{theme === Theme.Light ? "Dark Mode" : "Light Mode"}
			</button>
		</nav>
	);
};

export default Navbar;
