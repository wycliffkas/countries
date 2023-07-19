import React, { createContext, useState } from "react";

export enum Theme {
	Light = "light",
	Dark = "dark"
}

interface ThemeContextType {
	theme: Theme;
	toggleTheme: () => void;
}

interface ThemeProviderProps {
	children: React.ReactNode;
}

export const ThemeContext = createContext<ThemeContextType>({
	theme: Theme.Light,
	toggleTheme: () => {}
});

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
	const [theme, setTheme] = useState(Theme.Light);

	const toggleTheme = () => {
		const newTheme = theme === Theme.Light ? Theme.Dark : Theme.Light;
		setTheme(newTheme);
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
