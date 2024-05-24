import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import Home from "@pages/homes/Home";
import "./App.css";
import Flight from "@pages/homes/flights/Flight";
import Hotel from "@pages/homes/hotels/Hotel"; 
import FlightPayments from "@pages/homes/flights/payments/FlightPayments";
import HotelPayments from "@pages/homes/hotels/payments/HotelPayments";
import ResetPassword from "@components/auth/ResetPassword";
import { dashboardRoutes } from "./route";
import PostPaymentsHotel from "@pages/homes/hotels/payments/PostPaymentsHotel";
import PostPaymentsFlight from "@pages/homes/flights/payments/PostPaymentsFlight";

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
        path: "payments/:hotelId",
        element: <HotelPayments hotel={[]} />,
      },
      {
        path: "post-payments/:reservationId",
        element: <PostPaymentsHotel />,
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
        path: "payments/:flightId",
        element: <FlightPayments />,
      },
      {
        path: "post-payments/:ticketId",
        element: <PostPaymentsFlight />,
      },
    ],
  },
  ...dashboardRoutes,
  
  {
    path: "auth/reset-password",
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
