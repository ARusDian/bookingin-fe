import Home from "@pages/homes/Home";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashboardLayout from "@layouts/DashboardLayout";
import DashboardIndex from "@pages/dashboard/DashboardIndex";
import OpenSidebarProvider from "@contexts/providers/OpenSidebarProvider";
import UserList from "@pages/dashboard/users/UserList";
import UserAdd from "@pages/dashboard/users/UserAdd";
import PlaneTicketList from "@pages/dashboard/plane-tickets/PlaneTicketList";
import HotelTicketList from "@pages/dashboard/hotel-tickets/HotelTicketList";
import PartnerList from "@pages/dashboard/partners/PartnerList";
import Flight from "@pages/flights/Flight";
import Hotel from "@pages/hotels/Hotel";

const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <Home />,
  },
  {
    path: "/hotel",
    index: true,
    element: <Hotel />,
  },
  {
    path: "/flight",
    index: true,
    element: <Flight />,
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
  {
    path: "*",
    element: <div>404</div>,
  },
]);

function App() {
  return (
    <OpenSidebarProvider>
      <RouterProvider router={router} />
    </OpenSidebarProvider>
  );
}

export default App;
