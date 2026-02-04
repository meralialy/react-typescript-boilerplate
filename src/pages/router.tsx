import { createBrowserRouter, type RouteObject } from "react-router";
import Layout from "../components/layout/page-layout";
import Loader from "../components/loader/loader";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                lazy: () => import("../pages/home/home").then((module) => ({ Component: module.default })),
            },
            {
                path: "*",
                lazy: () =>
                    import("../components/page-not-found/page-not-found").then((module) => ({
                        Component: module.default,
                    })),
            },
        ],
        HydrateFallback: () => <Loader />,
    },
];

const router = createBrowserRouter(routes, { basename: "/" });

export default router;
