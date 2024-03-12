import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "@pages/homes/Home";
import "./App.css";
import DashboardLayout from "@layouts/DashboardLayout";
import DashboardIndex from "@pages/dashboard/DashboardIndex";
import UserList from "@pages/dashboard/admin/users/UserList";
import UserAdd from "@pages/dashboard/admin/users/UserAdd";
import PlaneTicketList from "@pages/dashboard/admin/plane-tickets/PlaneTicketList";
import HotelTicketList from "@pages/dashboard/admin/hotel-tickets/HotelTicketList";
import PartnerList from "@pages/dashboard/admin/partners/PartnerList";
import Topup from "@pages/dashboard/admin/users/top-up/Topup";
import UserEdit from "@pages/dashboard/admin/users/UserEdit";
import PartnerCreate from "@pages/dashboard/admin/partners/PartnerCreate";
import PartnerEdit from "@pages/dashboard/admin/partners/PartnerEdit";
import LoginAdmin from "@pages/LoginAdmin";
import { ToastContainer } from "react-toastify";

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
          {
            path: "top-up/:user_id",
            children: [
              {
                index: true,
                element: <Topup />,
              },
            ],
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
    <>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <CookiesProvider defaultSetOptions={{ path: "/" }}>
          <RouterProvider router={router} />;
        </CookiesProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
