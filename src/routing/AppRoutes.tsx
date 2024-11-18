import AuthWrapper from "@/components/Auth/AuthWrapper";
import { LoadingScreen } from "@/components/Loading/LoadingScreen";
import { SPLASH_ROUTE } from "@/pages/Splash";
import { FC, lazy, Suspense } from "react";
import {
    BrowserRouter,
    Navigate,
    Outlet,
    Route,
    Routes,
} from "react-router-dom";
import { BASE_ALL_ROUTE } from "./router";

const PrivateRoutes = lazy(() => import("./PrivateRoutes"));
const App = () => (
    <Suspense fallback={<LoadingScreen />}>
        <AuthWrapper>
            <Outlet />
        </AuthWrapper>
    </Suspense>
);

const AppRoutes: FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<App />}>
                    <Route path={BASE_ALL_ROUTE} element={<PrivateRoutes />} />
                    <Route index element={<Navigate to={SPLASH_ROUTE.BASE} />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
