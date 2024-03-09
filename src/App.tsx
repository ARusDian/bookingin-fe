import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "@pages/homes/Home";
import "./App.css";
import DashboardLayout from "@layouts/DashboardLayout";
import DashboardIndex from "@pages/dashboard/DashboardIndex";
import UserList from "@pages/dashboard/users/UserList";
import UserAdd from "@pages/dashboard/users/UserAdd";
import PlaneTicketList from "@pages/dashboard/plane-tickets/PlaneTicketList";
import HotelTicketList from "@pages/dashboard/hotel-tickets/HotelTicketList";
import PartnerList from "@pages/dashboard/partners/PartnerList";
import TopupList from "@pages/dashboard/users/top-up/TopupList";
import UserEdit from "@pages/dashboard/users/UserEdit";
import PartnerCreate from "@pages/dashboard/partners/PartnerCreate";
import PartnerEdit from "@pages/dashboard/partners/PartnerEdit";
import LoginAdmin from "@pages/LoginAdmin";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <Home />,
  },
  {
    path: "login-admin",
    element: <LoginAdmin />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardIndex />,
      },
      {
        path: "user",
        children: [
          {
            index: true,
            element: <UserList />,
          },
          {
            path: "create",
            element: <UserAdd />,
          },
          {
            path: "edit/:user_id",
            element: <UserEdit />,
          },
        ],
      },
      {
        path: "top-up",
        children: [
          {
            index: true,
            element: <TopupList />,
          },
        ],
      },
      {
        path: "plane-ticket",
        children: [
          {
            index: true,
            element: <PlaneTicketList />,
          },
        ],
      },
      {
        path: "hotel-ticket",
        children: [
          {
            index: true,
            element: <HotelTicketList />,
          },
        ],
      },
      {
        path: "partner",
        children: [
          {
            index: true,
            element: <PartnerList />,
          },
          {
            path: "create",
            element: <PartnerCreate />,
          },
          {
            path: "edit/:partner_id",
            element: <PartnerEdit />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <div>404</div>,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <RouterProvider router={router} />;
      </CookiesProvider>
    </QueryClientProvider>
  );
}

export default App;
