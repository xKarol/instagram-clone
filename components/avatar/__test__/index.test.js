import { render, screen, within } from "@testing-library/react";
import Avatar from "..";

describe("Avatar", () => {
  it("image should be in figure tag", () => {
    render(<Avatar />);
    const figureElement = screen.getByRole("figure");
    const imageElement = within(figureElement).getByRole("img");
    expect(imageElement).toBeInTheDocument();
  });

  it("should contain default avatar", () => {
    render(<Avatar />);
    const avatarElement = screen.getByRole("img");
    expect(avatarElement.src).not.toBeNull();
  });

  it("size should change", () => {
    render(<Avatar size={50} />);
    const figureElement = screen.getByRole("figure");
    expect(figureElement).toHaveStyle("width: 50px");
    expect(figureElement).toHaveStyle("height: 50px");
  });

  it("alt prop should change", () => {
    render(<Avatar alt="test alt" />);
    const avatarElement = screen.getByRole("img");
    expect(avatarElement).toHaveAttribute("alt", "test alt");
  });

  it("className prop should change", () => {
    render(<Avatar className="testclass" />);
    const avatarElement = screen.getByRole("figure");
    expect(avatarElement).toHaveClass("testclass");
  });

  it("src prop should change", () => {
    render(<Avatar src="/test" />);
    const avatarElement = screen.getByRole("img");
    expect(avatarElement).toHaveAttribute("src", "/test");
  });
});
