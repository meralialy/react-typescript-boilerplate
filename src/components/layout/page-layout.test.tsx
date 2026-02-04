import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Layout from "./page-layout";

// Mock Outlet to verify it renders within the layout
vi.mock("react-router", () => ({
    Outlet: () => <div data-testid="outlet" />,
}));

describe("Layout Component", () => {
    it("renders the main content area and outlet", () => {
        render(<Layout />);

        const main = screen.getByRole("main");

        expect(main).toHaveClass("content");
        expect(screen.getByTestId("outlet")).toBeInTheDocument();
    });
});
