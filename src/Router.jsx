import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedData/ProtectedRoute";
import App from "./App";
import { UserLayout,UserHomeLayout ,
    PublicLayout,
    UserProfileLayout,
    StoreLayout,
    UserSubscriptionsLayout,
    AdminLayout,AdminHomeLayout
} from "./Layouts/AllLayouts";
import Login from "./Pages/RegisterPages/Login.jsx";
import SignUpPage from "./Pages/RegisterPages/SignUpPage.jsx";
/* User Dashboard */
const AppLayoutUser = () => (
  <>
    <UserLayout/>
  </>
);

const AppLayoutAdmin = () => (
  <>
    <AdminLayout/>
  </>
);

export const router = createBrowserRouter([

    //Login user page
    {
      path: "login",
      element: <Login />,
    },

    //SignUp user page
    {
      path: "signUp",
      element: <SignUpPage />,
    },

    {
        path: "/",
        element: <PublicLayout />,
    },

     /* User Routes*/
     {
      // element: <ProtectedRoute allowedRoles={['admin']} />,
      path: '/dashboard_admin',
      children: [
        {
          path: '',
          element: <AppLayoutAdmin/>,
          children: [
            {
              path: '',
              element: <AdminHomeLayout/>,
            },
            {
              path: 'payment_method',
              element: <AdminHomeLayout/>,
            },
          ],
        },
      ],
     },
  /* User Routes*/
    {
        // element: <ProtectedRoute allowedRoles={['user']} />,
        path: '/dashboard_user',
        children: [
          {
            path: '',
            element: <AppLayoutUser/>,
            children: [
              {
                path: '',
                element: <UserHomeLayout/>,
              },
              {
                path: 'profile',
                element: <UserProfileLayout/>,
              },  
              {
                path: 'store',
                element: <StoreLayout/>,
              },
              {
                path: 'subscription',
                element: <UserSubscriptionsLayout/>,
              },
            ],
          },
        ],
    },

])