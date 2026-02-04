import { Suspense } from "react";
import "./components/i18n/i18n";
import "./index.scss";
import { createRoot } from "react-dom/client";
import App from "./components/app/app";

const container = document.getElementById("app");
const root = createRoot(container!);

root.render(
    <Suspense fallback={<div>loading...</div>}>
        <App />
    </Suspense>,
);
