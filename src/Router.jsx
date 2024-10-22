import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedData/ProtectedRoute";
import App from "./App";
import { UserLayout,UserHomeLayout ,
    PublicLayout
} from "./Layouts/AllLayouts";
import LoginAdmin from './Pages/RegisterPages/LoginAdmin.jsx'
/* User Dashboard */
const AppLayoutUser = () => (
  <>
    <UserLayout/>
  </>
);

export const router = createBrowserRouter([

    {
        path: "/login_admin",
        element: <LoginAdmin />,
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
            ],
          },
        ],
      },

])