import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe("Header component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        isAuthenticated: true,
        user: { name: "Test User" },
        role: "doctor",
      },
    });
  });

  test("renders logo and user menu", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    // Check for logo text
    expect(screen.getByText("UHRH")).toBeInTheDocument();

    // Check for username
    expect(screen.getByText("Test User")).toBeInTheDocument();
  });

  test("renders nav items for doctor role", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Vitals")).toBeInTheDocument();
    expect(screen.getByText("ECG")).toBeInTheDocument();
    expect(screen.getByText("Prescriptions")).toBeInTheDocument();
    expect(screen.getByText("Lab Results")).toBeInTheDocument();
    expect(screen.getByText("CKD Risk")).toBeInTheDocument();
    expect(screen.getByText("Diabetes Risk")).toBeInTheDocument();
  });
});
