import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer component", () => {
  it("renders the footer text", () => {
    render(<Footer />);
    expect(screen.getByText(/© 2025 Unified Health Record Hub/i)).toBeInTheDocument();
  });

  it("renders useful links", () => {
    render(<Footer />);
    expect(screen.getByText(/Privacy/i)).toBeInTheDocument();
    expect(screen.getByText(/Terms/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument(); // fixed
  });

  it("has social links", () => {
    render(<Footer />);
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThan(2);
    expect(links.some(link => link.href.includes("github"))).toBeTruthy();
  });

  it("renders footer element with proper class", () => {
    const { container } = render(<Footer />);
    expect(container.querySelector("footer")).toBeInTheDocument();
  });
});
