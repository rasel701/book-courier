import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import MainRoot from "../RootLayout/mainRoot";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Books from "../pages/Books/Books";
import Dashboard from "../pages/Dashboard/Dashboard";
import BookDetails from "../pages/BookDetails/BookDetails";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainRoot,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/books",
        Component: Books,
      },
      {
        path: "/book-details/:id",
        element: <BookDetails />,
      },
      {
        path: "/dashboard",
        Component: Dashboard,
      },
    ],
  },
]);

export default router;
