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
import BookEdit from "../pages/BookEdit/BookEdit";
import AllUser from "../pages/AllUser/AllUser";
import ManageBooks from "../pages/ManageBooks/ManageBooks";
import WishList from "../pages/WishList/WishList";
import AdminProtected from "./AdminProtected";
import LibrarianProtected from "./LibrarianProtected";
import Loading from "../Components/Loading";
import UserProtect from "./UserProtect";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainRoot,
    hydrateFallbackElement: <Loading />,
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
        element: (
          <UserProtect>
            <MyOrders />
          </UserProtect>
        ),
      },
      {
        path: "payment-success",
        element: (
          <UserProtect>
            <PaymentSuccess />
          </UserProtect>
        ),
      },
      {
        path: "payment-cancel",
        element: (
          <UserProtect>
            <PaymentCancel />
          </UserProtect>
        ),
      },
      {
        path: "invoices",
        element: (
          <UserProtect>
            {" "}
            <Invoices />
          </UserProtect>
        ),
      },
      {
        path: "my-profile",
        element: <MyProfile />,
      },
      {
        path: "wish-list",
        element: (
          <UserProtect>
            <WishList />
          </UserProtect>
        ),
      },

      // librarian route
      {
        path: "add-book",
        element: (
          <LibrarianProtected>
            <AddBook />
          </LibrarianProtected>
        ),
      },
      {
        path: "my-book",
        element: (
          <LibrarianProtected>
            <MyBook />
          </LibrarianProtected>
        ),
      },
      {
        path: "order-list",
        element: (
          <LibrarianProtected>
            <OrderList />
          </LibrarianProtected>
        ),
      },
      {
        path: "book-edit/:id",
        element: (
          <LibrarianProtected>
            <BookEdit />
          </LibrarianProtected>
        ),
      },

      // Admin route

      {
        path: "all-users",
        element: (
          <AdminProtected>
            <AllUser />
          </AdminProtected>
        ),
      },
      {
        path: "manage-books",
        element: (
          <AdminProtected>
            <ManageBooks />
          </AdminProtected>
        ),
      },
    ],
  },
]);

export default router;
