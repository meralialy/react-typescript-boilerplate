import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import App from "./app";

// Mock the router configuration to prevent side effects from the actual router instance
vi.mock("../../pages/router", () => ({
    default: {},
}));

// Mock RouterProvider to verify it is rendered without needing a real router context
vi.mock("react-router", () => ({
    RouterProvider: () => <div data-testid="router-provider" />,
}));

describe("App Component", () => {
    it("renders the router provider", () => {
        render(<App />);
        expect(screen.getByTestId("router-provider")).toBeInTheDocument();
    });
});
