import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedData/ProtectedRoute";
import App from "./App";
import { UserLayout,UserHomeLayout ,
    PublicLayout,
    UserProfileLayout
} from "./Layouts/AllLayouts";
import LoginAdmin from './Pages/RegisterPages/LoginAdmin.jsx'
import LoginUser from "./Pages/RegisterPages/LoginUser.jsx";
import SignUpPage from "./Pages/RegisterPages/SignUpPage.jsx";
/* User Dashboard */
const AppLayoutUser = () => (
  <>
    <UserLayout/>
  </>
);

export const router = createBrowserRouter([

    //Login admin page
    {
        path: "/login_admin",
        element: <LoginAdmin />,
    },

    //Login user page
    {
      path: "login_user",
      element: <LoginUser />,
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
            ],
          },
        ],
    },

])