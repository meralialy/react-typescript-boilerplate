import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Home from "./home";

// Mock the react-i18next module using Vitest's 'vi' object
vi.mock("react-i18next", () => ({
    useTranslation: () => {
        return {
            t: (key: string) => key,
            i18n: {
                changeLanguage: vi.fn(),
            },
        };
    },
}));

describe("Home Component", () => {
    it("renders the heading with the correct translation key", () => {
        render(<Home />);

        // We check for the key "home-page" because of our mock logic
        const heading = screen.getByRole("heading", { level: 1 });

        expect(heading).toBeDefined();
        expect(heading.textContent).toBe("home-page");
    });
});
