import React from "react";
import { useTranslation } from "react-i18next";

const Home: React.FunctionComponent = () => {
    const { t } = useTranslation();

    return <h1>{t("home-page")}</h1>;
};

export default Home;
