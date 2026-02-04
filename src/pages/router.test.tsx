import { render, screen, waitFor, act } from "@testing-library/react";
import { RouterProvider } from "react-router";
import { describe, it, expect, vi, beforeEach } from "vitest";
import router, { routes } from "./router";

// Mock the components to avoid full rendering and isolate routing logic
vi.mock("../components/layout/page-layout", async () => {
    const { Outlet } = await import("react-router");

    return {
        default: () => (
            <div data-testid="layout">
                Layout
                <Outlet />
            </div>
        ),
    };
});

vi.mock("../components/loader/loader", () => ({
    default: () => <div data-testid="loader">Loader</div>,
}));

vi.mock("../pages/home/home", () => ({
    default: () => <div data-testid="home">Home Page</div>,
}));

vi.mock("../components/page-not-found/page-not-found", () => ({
    default: () => <div data-testid="not-found">Page Not Found</div>,
}));

describe("Router", () => {
    beforeEach(async () => {
        await act(async () => {
            await router.navigate("/");
        });
    });

    it("renders the layout and home page for the root path", async () => {
        render(<RouterProvider router={router} />);

        // Verify Layout is rendered
        expect(screen.getByTestId("layout")).toBeInTheDocument();

        // Verify Home page is rendered (lazy loaded)
        await waitFor(() => {
            expect(screen.getByTestId("home")).toBeInTheDocument();
        });
    });

    it("renders page not found for unknown routes", async () => {
        render(<RouterProvider router={router} />);

        await act(async () => {
            await router.navigate("/some-non-existent-route");
        });

        await waitFor(() => {
            expect(screen.getByTestId("not-found")).toBeInTheDocument();
        });
    });

    it("renders the loader as the hydration fallback", () => {
        const rootRoute = routes[0];
        const HydrateFallback = rootRoute.HydrateFallback;

        expect(HydrateFallback).toBeDefined();
        if (HydrateFallback) {
            render(<HydrateFallback />);
        }
        expect(screen.getByTestId("loader")).toBeInTheDocument();
    });
});
