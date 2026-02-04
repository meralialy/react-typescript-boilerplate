import React from "react";
import { useTranslation } from "react-i18next";

const PageNotFound: React.FunctionComponent = () => {
    const { t } = useTranslation();

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <h1>{t("page_not_found")}</h1>
        </div>
    );
};

export default PageNotFound;
