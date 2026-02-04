import React from "react";
import { useTranslation } from "react-i18next";

const Loader: React.FunctionComponent = () => {
    const { t } = useTranslation();

    return <div style={{ display: "flex", justifyContent: "center" }}>{t("loading")}</div>;
};

export default Loader;
