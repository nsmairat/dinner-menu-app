import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders welcome title", () => {
  render(<App />);
  const heading = screen.getByText(/welcome to the smairats/i);
  expect(heading).toBeInTheDocument();
});
