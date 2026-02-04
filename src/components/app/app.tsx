import React from "react";
import { RouterProvider } from "react-router";
import router from "../../pages/router";

/**
 * Root application component that sets up the RouterProvider.
 */
const App: React.FunctionComponent = () => {
    return <RouterProvider router={router} />;
};

export default App;
