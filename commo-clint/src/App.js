import './App.css';
import MainNavbarlist from './components/MainNavBar/MainNavbarlist';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import WhatsAppNavigation from './pages/whatsappmarketing/WhatsAppNavigation';

import Contacts from './components/Contact';
import TeamInbox from './pages/whatsappmarketing/TeamInbox';
import WhatsappLandingPage from './pages/whatsappmarketing/WhatsappLandingPage';
import Footer from './components/Footer';
import WhatsAppMarketing from './pages/whatsappmarketing/whatsappmarketing';
import EmailMarketing from './pages/emailmarketing/EmailMarketing';
import ColdCalling from './pages/coldcallingmarketing/ColdCalling';
import SMS from './pages/smsmarketing/SMS';

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
      element: <MainNavbarlist/>,
    },
    {
      path: '/whatsappmarketing',
      element: <WhatsappMainLayout />,
      children: [
        {
          path:'',
          element:<><WhatsappLandingPage /><Footer /></>,
        },
        {
          path: "TeamInbox",
          element:<><TeamInbox /><Footer /></>,
        },
        {
          path: 'Broadcast',
          element:<><TeamInbox /><Footer /></>,
        },
        {
          path: 'contacts',
          element:<><Contacts /><Footer /></>,
        },
      
      ],
    },

    {
      path:'/Features/WhatsAppMarketing',
      element: <WhatsAppMarketing/>
    },

    {
      path:'/Features/EmailMarketing',
      element:<EmailMarketing/>
    },
    {
      path:'/Features/ColdCalling',
      element:<ColdCalling/>
    },
    {
      path:'/Features/SMS',
      element:<SMS/>
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
