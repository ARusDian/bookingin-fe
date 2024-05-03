import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
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
import LoginDashboard from "@pages/LoginDashboard";
import LogList from "@pages/dashboard/admin/log/LogList";
import HotelList from "@pages/dashboard/hotel/HotelList";
import HotelCreate from "@pages/dashboard/hotel/HotelCreate";
import HotelEdit from "@pages/dashboard/hotel/HotelEdit";
import AirlineList from "@pages/dashboard/airline/AirlineList";
import AirlineCreate from "@pages/dashboard/airline/AirlineCreate";
import HotelRoomList from "@pages/dashboard/hotel/room/HotelRoomList";
import HotelRoomAdd from "@pages/dashboard/hotel/room/HotelRoomAdd";
import FacilityCreate from "@pages/dashboard/hotel/facility/FacilityCreate";
import AirlineEdit from "@pages/dashboard/airline/AirlineEdit";
import PlaneList from "@pages/dashboard/airline/plane/PlaneList";
import PlaneCreate from "@pages/dashboard/airline/plane/PlaneCreate";
import AirlineSeatList from "@pages/dashboard/airline/plane/seat/AirlineSeatList";
import AirlineSeatCreate from "@pages/dashboard/airline/plane/seat/AirlineSeatCreate";
import PlaneFlightList from "@pages/dashboard/airline/plane/flight/PlaneFlightList";
import PlaneFlightAdd from "@pages/dashboard/airline/plane/flight/PlaneFlightAdd";
import TransactionList from "@pages/dashboard/admin/transactions/TransactionList";
import PlaneEdit from "@pages/dashboard/airline/plane/PlaneEdit";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <Home />,
  },
  {
    path: "login-dashboard",
    element: <LoginDashboard />,
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
          {
            path: "hotel",
            children: [
              {
                index: true,
                element: <HotelList />,
              },
              {
                path: "create",
                element: <HotelCreate />,
              },
              {
                path: ":hotel_id",
                children: [
                  {
                    index: true,
                    element: <HotelEdit />,
                  },
                  {
                    path: "room",
                    children: [
                      {
                        index: true,
                        element: <HotelRoomList />,
                      },
                      {
                        path: "add",
                        element: <HotelRoomAdd />,
                      },
                    ],
                  },
                  {
                    path: "facility/add",
                    element: <FacilityCreate />,
                  },
                ],
              },
            ],
          },
          {
            path: "airline",
            children: [
              {
                index: true,
                element: <AirlineList />,
              },
              {
                path: "create",
                element: <AirlineCreate />,
              },
              {
                path: "edit/:airline_id",
                element: <AirlineEdit />,
              },
              {
                path: ":airline_id",
                children: [
                  {
                    path: "plane",
                    children: [
                      {
                        index: true,
                        element: <PlaneList />,
                      },
                      {
                        path: "create",
                        element: <PlaneCreate />,
                      },
                      {
                        path: "edit/:plane_id",
                        element: <PlaneEdit />,
                      },
                      {
                        path: ":plane_id",
                        children: [
                          {
                            path: "seat",
                            element: <AirlineSeatList />,
                          },
                          {
                            path: "seat/create",
                            element: <AirlineSeatCreate />,
                          },
                          {
                            path: "flight",
                            element: <PlaneFlightList />,
                          },
                          {
                            path: "flight/create",
                            element: <PlaneFlightAdd />,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "transactions",
        element: <TransactionList />
      },
      {
        path: "log",
        element: <LogList />,
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
