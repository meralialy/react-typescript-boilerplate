import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "../../locales/en.json";
import fr from "../../locales/fr.json";

interface TranslationNode {
    translation: string;
    notes?: string;
}

const flattenTranslations = (obj: Record<string, TranslationNode | string>) => {
    const flattened: Record<string, string> = {};

    Object.keys(obj).forEach((key) => {
        const value = obj[key];

        flattened[key] =
            typeof value === "object" && value !== null && "translation" in value
                ? value.translation
                : (value as string);
    });

    return flattened;
};

const defaultNS = "translation";

const resources = {
    en: { [defaultNS]: flattenTranslations(en) },
    fr: { [defaultNS]: flattenTranslations(fr) },
} as const;

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        defaultNS,
        resources,
        returnObjects: false,
        interpolation: { escapeValue: false },
    });

declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: typeof defaultNS;
        resources: (typeof resources)["en"];
        returnObjects: false;
    }
}
