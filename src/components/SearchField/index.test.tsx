import { render, screen, fireEvent } from "@testing-library/react";
import SearchField from "./index";

describe("SearchField Component", () => {
  it("should render the search field with placeholder text", () => {
    render(
      <SearchField
        searchValue=""
        handleSearchChange={jest.fn()}
      />
    );

    const searchInput = screen.getByPlaceholderText("Search for a country...");
    expect(searchInput).toBeInTheDocument();
  });

  it("should call handleSearchChange on input change", () => {
    const handleSearchChange = jest.fn();
    render(
      <SearchField
        searchValue=""
        handleSearchChange={handleSearchChange}
      />
    );

    const searchInput = screen.getByPlaceholderText("Search for a country...");
    fireEvent.change(searchInput, { target: { value: "Germany" } });

    expect(handleSearchChange).toHaveBeenCalledTimes(1);
  });
});
