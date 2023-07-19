import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import Card from "./index";

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe("Card Component", () => {

  const mockCardProps = {
    officialName: "French Republic",
    commonName: "France",
    population: 1000000,
    region: "Europe",
    capital: "Paris",
    flag: "flag.jpg",
  };

  it("should render the card with correct content", () => {

    render(<Card {...mockCardProps} />);

    const title = screen.queryByText(/French Republic/);
    const population = screen.queryByText(/1,000,000/);
    const region = screen.queryByText(/Europe/);
    const capital = screen.queryByText(/Paris/);
    const flag = screen.getByAltText("Country Flag");

    expect(title).toBeInTheDocument();
    expect(population).toBeInTheDocument();
    expect(region).toBeInTheDocument();
    expect(capital).toBeInTheDocument();
    expect(flag).toBeInTheDocument();
    expect(flag).toHaveAttribute("src", mockCardProps.flag);
  });

  it("should call navigate when clicked", () => {
    const mockNavigate: NavigateFunction = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(<Card {...mockCardProps} />);

    const cardElement = screen.getByTestId('country-card');

    fireEvent.click(cardElement);

    expect(mockNavigate).toHaveBeenCalledWith('/country/France');
  });
});
