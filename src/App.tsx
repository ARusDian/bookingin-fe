import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import Home from "@pages/homes/Home";
import "./App.css";
import { dashboardRoutes } from "./route";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <Home />,
  },
  ...dashboardRoutes,
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
