import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import BorderCountries, { BorderCountriesProps } from "./index";

describe("BorderCountries component", () => {
	const mockCountryCodes: BorderCountriesProps["countryCodes"] = [
		"ABC",
		"DEF",
		"GHI"
	];

	beforeEach(() => {
		jest.spyOn(global, "fetch").mockImplementation((url) => {
			const urlString = url.toString(); 
			if (urlString.includes("/alpha/ABC")) {
				const response: Response = new Response(
					JSON.stringify({ name: "Country A" }),
					{
						status: 200,
						headers: { "Content-type": "application/json" }
					}
				);
				return Promise.resolve(response);
			}
			if (urlString.includes("/alpha/DEF")) {
				const response: Response = new Response(
					JSON.stringify({ name: "Country B" }),
					{
						status: 200,
						headers: { "Content-type": "application/json" }
					}
				);
				return Promise.resolve(response);
			}
			if (urlString.includes("/alpha/GHI")) {
				const response: Response = new Response(
					JSON.stringify({ name: "Country C" }),
					{
						status: 200,
						headers: { "Content-type": "application/json" }
					}
				);
				return Promise.resolve(response);
			}
			return Promise.reject(new Error("Invalid URL"));
		});
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it("renders the component and displays border countries", async () => {
		render(
			<Router>
				<BorderCountries countryCodes={mockCountryCodes} />
			</Router>
		);

		const countryButtons = await screen.findAllByRole("button");

		expect(countryButtons).toHaveLength(3);
		expect(countryButtons[0]).toHaveTextContent("Country A");
		expect(countryButtons[1]).toHaveTextContent("Country B");
		expect(countryButtons[2]).toHaveTextContent("Country C");
	});

	it("displays loading message while fetching border countries", async () => {
		jest.spyOn(global, "fetch").mockImplementation(() => new Promise(() => {}));

		render(
			<Router>
				<BorderCountries countryCodes={mockCountryCodes} />
			</Router>
		);

		const loadingMessage = await screen.findByText(
			"Loading Border countries..."
		);
		expect(loadingMessage).toBeInTheDocument();
	});
});
