import { FC, lazy, ReactNode, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SuspenseView from "@/components/Suspense/SuspenseView";

const PrivateLayout = lazy(() => import("@/components/layout/PrivateLayout"));
const Introduction = lazy(() => import("@/pages/Introduction"));
const Invite = lazy(() => import("@/pages/Invite"));
const Profile = lazy(() => import("@/pages/Profile"));
const Splash = lazy(() => import("@/pages/Splash"));
const Home = lazy(() => import("@/pages/Home"));
const Ranking = lazy(() => import("@/pages/Ranking"));
const Lucky = lazy(() => import("@/pages/Lucky"));
const Task = lazy(() => import("@/pages/Task"));
const PvP = lazy(() => import("@/pages/PvP"));
const Deposit = lazy(() => import("@/pages/Deposit"))
const Withdraw = lazy(() => import("@/pages/Withdraw"))
const History = lazy(() => import("@/pages/History"))

const routeHasLayout: IRoute[] = [
  {
    path: "/home",
    page: <Home />,
    loading: true,
  },
  {
    path: "/ranking",
    page: <Ranking />,
    loading: true,
  },
  {
    path: "/lucky",
    page: <Lucky />,
    loading: true,
  },
  {
    path: "/task",
    page: <Task />,
    loading: true,
  },
  {
    path: "/invite",
    page: <Invite />,
    loading: true,
  },
  {
    path: "/profile",
    page: <Profile />,
    loading: true,
  },
  {
    path: "/pvp",
    page: <PvP />,
    loading: true,
  },
  {
    path: "/deposit",
    page: <Deposit />,
    loading: true
  },
  {
    path: "/withdraw",
    page: <Withdraw />,
    loading: true
  },
  {
    path: "/history",
    page: <History />,
    loading: true
  }
]

const routes: IRoute[] = [
  {
    path: "/",
    page: <Navigate to="/splash" />,
  },
  {
    path: "/splash",
    page: <Splash />,
    loading: true,
  },
  {
    path: "/introduction",
    page: <Introduction />,
  },

];

export interface IRoute {
  path: string;
  page: ReactNode;
  loading?: boolean;
}

const renderRoutes = (routes: IRoute[]) =>
  routes.map(({ path, page, loading }) => {
    const element = loading ? <Suspense fallback={<SuspenseView />}>{page}</Suspense> : page;
    return <Route key={path} path={path} element={element} />;
  });


const PrivateRoutes: FC = () => {
  return (
    <Routes>
      <Route element={<PrivateLayout />}>
        {renderRoutes(routeHasLayout)}
      </Route>
      {renderRoutes(routes)}
    </Routes>
  );
};

export default PrivateRoutes;
