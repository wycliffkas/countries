import { render, screen } from "@testing-library/react";

import NotFound from "./index";

describe("NotFound", () => {
	it("renders the 'Page Not Found' text", () => {
		render(<NotFound />);
		const pageNotFoundText = screen.getByText("Page Not Found");
		expect(pageNotFoundText).toBeInTheDocument();
	});
});
