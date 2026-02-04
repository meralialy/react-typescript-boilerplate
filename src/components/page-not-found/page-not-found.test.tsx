import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PageNotFound from "./page-not-found";

// Mock useTranslation to return the key directly
vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe("PageNotFound Component", () => {
    it("renders the page not found heading", () => {
        render(<PageNotFound />);
        const heading = screen.getByRole("heading", { level: 1 });

        expect(heading).toHaveTextContent("page_not_found");
    });
});
