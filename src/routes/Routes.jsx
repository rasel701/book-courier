import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import MainRoot from "../RootLayout/mainRoot";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Books from "../pages/Books/Books";
import Dashboard from "../pages/Dashboard/Dashboard";
import BookDetails from "../pages/BookDetails/BookDetails";
import DashboardLayout from "./../DashboardLayout/DashboardLayout";
import DashboardHome from "../DashboardLayout/DashboardHome";
import MyOrders from "../pages/MyOrders/MyOrders";
import PaymentSuccess from "../pages/PaymentSuccess/PaymentSuccess";
import PaymentCancel from "../pages/PaymentCancel/PaymentCancel";
import Invoices from "../pages/Invoices/Invoices";
import MyProfile from "../pages/MyProfile/MyProfile";
import ProtectedRoute from "./ProtectedRoute";
import AddBook from "../pages/AddBook/AddBook";
import MyBook from "../pages/MyBook/MyBook";
import OrderList from "../pages/OrderList/OrderList";

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
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "my-orders",
        element: <MyOrders />,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "payment-cancel",
        element: <PaymentCancel />,
      },
      {
        path: "invoices",
        element: <Invoices />,
      },
      {
        path: "my-profile",
        element: <MyProfile />,
      },

      // librarian route
      {
        path: "add-book",
        element: <AddBook />,
      },
      {
        path: "my-book",
        element: <MyBook />,
      },
      {
        path: "order-list",
        element: <OrderList />,
      },
    ],
  },
]);

export default router;
