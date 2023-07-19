import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate, useParams } from "react-router-dom";
import CountryDetails from "./index";

jest.mock("react-router-dom", () => ({
	useNavigate: jest.fn(),
	useParams: jest.fn()
}));

describe("CountryDetails component", () => {
	const mockCountry = {
		name: { common: "United States" },
		flags: { svg: "https://example.com/flag.svg" },
		population: 331449281,
		region: "Americas",
		subregion: "Northern America",
		capital: ["Washington, D.C."],
		tld: [".us"],
		currencies: {
			USD: { name: "United States dollar", symbol: "$" }
		},
		languages: {
			eng: "English"
		},
		borders: ["CAN", "MEX"]
	};

	beforeEach(() => {
		(useNavigate as jest.Mock).mockClear();
		(useParams as jest.Mock).mockReturnValue({ countryName: "united-states" });
	});

	it("renders country details correctly", async () => {
		global.fetch = jest.fn().mockResolvedValue({
			json: jest.fn().mockResolvedValue([mockCountry])
		});

		render(<CountryDetails />);

		expect(screen.getByText("Loading country...")).toBeInTheDocument();

		await screen.findByText("Americas");
		expect(screen.getByText(/331,449,281/)).toBeInTheDocument();
		expect(screen.getByText(/Americas/)).toBeInTheDocument();
		expect(screen.getByText(/Northern America/)).toBeInTheDocument();
		expect(screen.getByText(/Washington, D.C./)).toBeInTheDocument();
		expect(screen.getByText(/.us/)).toBeInTheDocument();
		expect(screen.getByText(/United States dollar/)).toBeInTheDocument();
		expect(screen.getByText(/English/)).toBeInTheDocument();
	});
});
