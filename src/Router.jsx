import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedData/ProtectedRoute";
import App from "./App";
import { UserLayout,UserHomeLayout ,
    PublicLayout,
    UserProfileLayout,
    StoreLayout,
    UserSubscriptionsLayout,
    AdminLayout,AdminHomeLayout,
    PaymentMethodLayout,
    AddPaymentMethodLayout,
    EditPaymentMethodLayout,
    PlanLayout,
    AddPlanLayout,
    EditPlanLayout
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
const AppLayoutPlan = () => (
  <>
    <Outlet/>
  </>
);
const AppLayoutPaymentMethod = () => (
  <>
    <Outlet/>
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
              path: 'plan',
              element: <AppLayoutPlan/>,
              children:[
                {
                  path:'',
                  element: <PlanLayout/>,
                },
                {
                  path:'add',
                  element: <AddPlanLayout/>,
                },
                {
                  path:'edit/:planId',
                  element: <EditPlanLayout/>,
                },
              ]
            }, 
            {
              path: 'payment_method',
              element: <AppLayoutPaymentMethod/>,
              children:[
                {
                  path:'',
                  element: <PaymentMethodLayout/>,
                },
                {
                  path:'add',
                  element: <AddPaymentMethodLayout/>,
                },
                {
                  path:'edit/:methodId',
                  element: <EditPaymentMethodLayout/>,
                },
              ]
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