import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./index";
import { ThemeContext, Theme } from "../../context/ThemeContext";

describe("Navbar", () => {
	test("renders navbar with light theme by default", () => {
		render(
			<ThemeContext.Provider
				value={{ theme: Theme.Light, toggleTheme: jest.fn() }}>
				<Navbar />
			</ThemeContext.Provider>
		);

		const navbarTitle = screen.getByText("Where in the world?");
		const toggleButton = screen.getByRole("button");

		expect(navbarTitle).toBeInTheDocument();
		expect(toggleButton).toHaveTextContent("Dark Mode");
	});

	test("toggles theme when the toggle button is clicked", () => {
		const toggleTheme = jest.fn();
		render(
			<ThemeContext.Provider value={{ theme: Theme.Light, toggleTheme }}>
				<Navbar />
			</ThemeContext.Provider>
		);

		const toggleButton = screen.getByRole("button");

		fireEvent.click(toggleButton);

		expect(toggleTheme).toHaveBeenCalledTimes(1);
	});
});
