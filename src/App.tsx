import Home from "@pages/homes/Home";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashboardLayout from "@layouts/DashboardLayout";
import DashboardIndex from "@pages/dashboard/DashboardIndex";

const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <Home />
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardIndex />
      }
    ]
  },
  {
    path: "*",
    element: <div>404</div>
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
