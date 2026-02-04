import i18next from "i18next";
import { describe, it, expect, vi } from "vitest";

// Mock the locale files to test the flattening logic specifically
vi.mock("../..//locales/en.json", () => ({
    default: {
        simple_key: "Simple Value",
        complex_key: {
            translation: "Complex Value",
            notes: "This should be stripped",
        },
    },
}));

vi.mock("../..//locales/fr.json", () => ({
    default: {
        simple_key: "Valeur Simple",
    },
}));

// Import the configuration file to trigger initialization
import "./i18n";

describe("i18n Configuration", () => {
    it("initializes with the correct fallback language", () => {
        // i18next normalizes fallbackLng to an array internally
        expect(i18next.options.fallbackLng).toContain("en");
    });

    it("loads and flattens English translations correctly", () => {
        const enResources = i18next.getResourceBundle("en", "translation");

        expect(enResources).toBeDefined();
        expect(enResources.simple_key).toBe("Simple Value");
        expect(enResources.complex_key).toBe("Complex Value");
    });

    it("loads French translations correctly", () => {
        const frResources = i18next.getResourceBundle("fr", "translation");

        expect(frResources).toBeDefined();
        expect(frResources.simple_key).toBe("Valeur Simple");
    });
});
