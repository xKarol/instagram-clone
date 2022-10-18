import { render, screen, within } from "@testing-library/react";
import Layout from "..";

describe("Layout", () => {
  it("should be rendered", () => {
    render(<Layout />);
    const layoutElement = screen.getByRole("main");
    expect(layoutElement).toBeInTheDocument();
  });
  it("should add new class", () => {
    render(<Layout className="new-class" />);
    const layoutElement = screen.getByRole("main");
    expect(layoutElement).toHaveClass("new-class");
  });
  it("should contain children", () => {
    render(
      <Layout>
        <div data-testid="child" />
      </Layout>
    );
    const layoutElement = screen.getByRole("main");
    const childElement = within(layoutElement).getByTestId("child");
    expect(layoutElement).toBeInTheDocument();
    expect(childElement).toBeInTheDocument();
  });
});
