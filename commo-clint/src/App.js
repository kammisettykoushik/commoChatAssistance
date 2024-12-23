import './App.css';
import MainNavbarlist from './components/MainNavBar/MainNavbarlist';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import WhatsAppNavigation from './pages/whatsappmarketing/WhatsAppNavigation';

import Contacts from './components/Contact';
import TeamInbox from './pages/whatsappmarketing/TeamInbox';
import WhatsappLandingPage from './pages/whatsappmarketing/WhatsappLandingPage';

function App() {
  const WhatsappMainLayout = () => (
    <>
      <WhatsAppNavigation />
      <Outlet />
    </>
  );

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainNavbarlist />,
    },
    {
      path: '/whatsappmarketing',
      element: <WhatsappMainLayout />,
      children: [
        {
          path:'',
          element:<WhatsappLandingPage />,
        },
        {
          path: "TeamInbox",
          element: <TeamInbox />,
        },
        {
          path: 'Broadcast',
          element: <TeamInbox />,
        },
        {
          path: 'contacts',
          element: <Contacts />,
        },
      
      ],
    },
    // {
    //   path: '/email',
    //   element: <WhatsappMainLayout />,
    //   children: [
    //     {
    //       path: 'features',
    //       element: <WhatsappFeatures />,
    //     },
    //     {
    //       path: 'pricing',
    //       element: <WhatsappPricing />,
    //     },
    //     {
    //       path: 'contacts',
    //       element: <Contacts />,
    //     },
    //   ],
    // },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
