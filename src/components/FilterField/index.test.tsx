import { render, screen, fireEvent } from "@testing-library/react";
import FilterField from "./index";

describe("FilterField Component", () => {
  const mockHandleFilterChange = jest.fn();

  it("should render the select element with the default option", () => {
    render(
      <FilterField
        filterValue=""
        handleFilterChange={mockHandleFilterChange}
      />
    );

    const filterSelect = screen.getByRole("combobox");
    expect(filterSelect).toBeInTheDocument();

    const defaultOption = screen.getByText("Filter by Region");
    expect(defaultOption).toBeInTheDocument();
  });

  it("should call handleFilterChange on select change", () => {
    render(
      <FilterField
        filterValue=""
        handleFilterChange={mockHandleFilterChange}
      />
    );

    const filterSelect = screen.getByRole("combobox");
    fireEvent.change(filterSelect, { target: { value: "Europe" } });

    expect(mockHandleFilterChange).toHaveBeenCalledTimes(1);
    expect(mockHandleFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({ target: expect.objectContaining({ value: "Europe" }) })
    );
  });
});
