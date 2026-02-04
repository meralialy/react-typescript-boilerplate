import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Loader from "./loader";

vi.mock("react-i18next", () => ({
    useTranslation: () => {
        return {
            t: (str: string) => str,
        };
    },
}));

describe("Loader", () => {
    it("should render the loading text", () => {
        render(<Loader />);
        expect(screen.getByText("loading")).toBeInTheDocument();
    });
});
