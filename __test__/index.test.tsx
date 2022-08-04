import { screen, render } from "@testing-library/react";
import Home from "@/pages";

describe("index", () => {
  it("hello", () => {
    render(<Home />);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});
