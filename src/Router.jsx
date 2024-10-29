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
    EditPlanLayout,
    UserEditProfileLayout,DemoRequestLayout,
    PendingPaymentLayout,
    OrderLayout,
    AddUserLayout,
    EditUserLayout,
    AddSubscriptionLayout,
    EditSubscriptionLayout,
    ExtraProductLayout,
    AddExtraProductLayout,
    EditExtraProductLayout,
    UserDashboardLayout,
    PaymentLayout,
} from "./Layouts/AllLayouts";
import Login from "./Pages/RegisterPages/Login.jsx";
import SignUpPage from "./Pages/RegisterPages/SignUpPage.jsx";
import SubscriptionLayout from "./Layouts/AdminLayouts/SubscriptionLayout.jsx";
/* User Dashboard */
const AppLayoutUser = () => (
  <>
    <UserDashboardLayout/>
  </>
);
const AppLayoutUserProfile = () => (
  <>
    <Outlet/>
  </>
);
const AppLayoutAdmin = () => (
  <>
    <AdminLayout/>
  </>
);
const AppLayoutUsers = () => (
  <>
    <Outlet/>
  </>
);
const AppLayoutSubscription = () => (
  <>
    <Outlet/>
  </>
);
const AppLayoutPlan = () => (
  <>
    <Outlet/>
  </>
);
const AppLayoutExtraProduct = () => (
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

    /* Admin Routes*/
    {
    element: <ProtectedRoute allowedRoles={['admin']} />,
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
            path: 'demo_request',
            element: <DemoRequestLayout/>,
          },
          {
            path: 'pending_payment',
            element: <PendingPaymentLayout/>,
          },
          {
            path: 'order',
            element: <OrderLayout/>,
          },
          {
            path: 'user',
            element: <AppLayoutUsers/>,
            children:[
              {
                path:'',
                element: <UserLayout/>,
              },
              {
                path:'add',
                element: <AddUserLayout/>,
              },
              {
                path:'edit/:userId',
                element: <EditUserLayout/>,
              },
            ]
          }, 
          {
            path: 'subscription',
            element: <AppLayoutSubscription/>,
            children:[
              {
                path:'',
                element: <SubscriptionLayout/>,
              },
              {
                path:'add',
                element: <AddSubscriptionLayout/>,
              },
              {
                path:'edit/:subscriptionId',
                element: <EditSubscriptionLayout/>,
              },
            ]
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
            path: 'extra_product',
            element: <AppLayoutExtraProduct/>,
            children:[
              {
                path:'',
                element: <ExtraProductLayout/>,
              },
              {
                path:'add',
                element: <AddExtraProductLayout/>,
              },
              {
                path:'edit/:extraId',
                element: <EditExtraProductLayout/>,
              },
            ]
          },
          {
            path: 'payment',
            element: <PaymentLayout/>,
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
        element: <ProtectedRoute allowedRoles={['user']} />,
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
                element: <AppLayoutUserProfile/>,
                children:[
                  {
                    path:'',
                    element: <UserProfileLayout/>,
                  },
                  {
                    path:'edit',
                    element: <UserEditProfileLayout/>
                  }
                ]
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