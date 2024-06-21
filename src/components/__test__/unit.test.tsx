import "@testing-library/jest-dom";
import { render, screen } from "./test-utils";
import Logo from "../ui/Logo";
import NavLink from "../ui/NavLink";
import { FaHome } from "react-icons/fa";

beforeEach(() => {
  window.scrollTo = jest.fn();
  window.HTMLDivElement.prototype.scrollIntoView = jest.fn();
});

describe("Logo Test", () => {
  it("should render one image at time", () => {
    render(<Logo />);

    const imgs = screen.getAllByRole("img");
    const smallImg = screen.getByAltText("logo-small");
    const longImg = screen.getByAltText("logo-long");

    expect(smallImg).toBeVisible();
    expect(longImg).not.toBeVisible();
    expect(imgs.length).toEqual(1);
  });
});
describe("NavLink", () => {
  it("should have one link, icon and text", () => {
    render(<NavLink props={{ text: "home", path: "/", icon: FaHome }} />);

    const link = screen.getByRole("link");
    const text = screen.getByText("home");
    const icon = screen.getByTestId("icon");
    expect(link).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
});
