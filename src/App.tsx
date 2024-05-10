import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import Home from "@pages/homes/Home";
import "./App.css";
import DashboardLayout from "@layouts/DashboardLayout";
import DashboardIndex from "@pages/dashboard/DashboardIndex";
import OpenSidebarProvider from "@contexts/providers/OpenSidebarProvider";
import UserList from "@pages/dashboard/users/UserList";
import UserAdd from "@pages/dashboard/users/UserAdd";
import PlaneTicketList from "@pages/dashboard/plane-tickets/PlaneTicketList";
import HotelTicketList from "@pages/dashboard/hotel-tickets/HotelTicketList";
import PartnerList from "@pages/dashboard/partners/PartnerList";
import Flight from "@pages/homes/flights/Flight";
import Hotel from "@pages/homes/hotels/Hotel"; 
import FlightPayments from "@pages/homes/flights/payments/FlightPayments";
import HotelPayments from "@pages/homes/hotels/payments/HotelPayments";
import PostPayments from "@pages/homes/PostPayments";
import ResetPassword from "@components/auth/ResetPassword";
import { dashboardRoutes } from "./route";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <Home />,
  },
  {
    path: "/hotel",
    children: [
      {
        index: true,
        element: <Hotel />,
      },
      {
        index: true,
        path: "payments",
        element: <HotelPayments />,
      },
    ],
  },
  {
    path: "/flight",
    children:[
      {
        index: true,
        element: <Flight />,
      },
      {
        path: "payments",
        element: <FlightPayments />,
      },
    ],
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
        path: "users",
        children: [
          {
            index: true,
            element: <UserList />,
          },
          {
            path: "create",
            element: <UserAdd />,
          },
        ],
      },
      {
        path: "plane-tickets",
        children: [
          {
            index: true,
            element: <PlaneTicketList />
          }
        ]
      },
      {
        path: "hotel-tickets",
        children: [
          {
            index: true,
            element: <HotelTicketList />
          }
        ]
      },
      {
        path: "partners",
        children: [
          {
            index: true,
            element: <PartnerList />
          }
        ]
      },
    ],
  },
  ...dashboardRoutes,
  {
    path: "post-payments",
    element: <PostPayments />,
  },
  {
    path: "reset-password",
    element: <ResetPassword />,
  },
  {
    path: "*",
    element: <div>404</div>,
  },
]);

function App() {
  return (
    <HelmetProvider>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <CookiesProvider defaultSetOptions={{ path: "/" }}>
          <RouterProvider router={router} />;
        </CookiesProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
