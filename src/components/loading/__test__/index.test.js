import { render, screen } from "@testing-library/react";
import Loading from "..";

describe("Loading", () => {
  it("loader should be visible", () => {
    render(<Loading data-testid="loader" />);
    const loadingElement = screen.getByTestId("loader");
    expect(loadingElement).toBeVisible();
  });

  it("className prop should change", () => {
    render(<Loading data-testid="loader" className="testclass" />);
    const loadingElement = screen.getByTestId("loader");
    expect(loadingElement).toHaveClass("testclass");
  });
});
