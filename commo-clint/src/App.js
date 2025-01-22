import './App.css';
import MainNavbarlist from './components/MainNavBar/MainNavbarlist';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import WhatsAppNavigation from './pages/whatsappmarketing/WhatsAppNavigation';

import Contacts from './components/Contact';
import TeamInbox from './pages/whatsappmarketing/TeamInbox';
import WhatsappLandingPage from './pages/whatsappmarketing/WhatsappLandingPage';
import WhatsAppMarketing from './pages/whatsappmarketing/whatsappmarketing';
import EmailMarketing from './pages/emailmarketing/Emailmarketing';
import ColdCalling from './pages/coldcallingmarketing/ColdCalling';
import SMS from './pages/smsmarketing/SMS';
import Footer from './components/Footer';
import Automations from './pages/whatsappmarketing/Automations';
import Templates from './pages/whatsappmarketing/Templates/Templates';
import BroadCast from './pages/whatsappmarketing/BroadCast';
import Preview from './pages/whatsappmarketing/Templates/CreateTemplate/Preview';
import SavedPreview from './pages/whatsappmarketing/Templates/CreateTemplate/SavedPreview';
import SelectTemplate from './pages/whatsappmarketing/Templates/CreateTemplate/SelectTemplate';

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
          path: 'BroadCast',
          element:<><BroadCast /><Footer /></>,
        },
        {
          path: 'Templates',
          element:<><Templates /><Footer /></>,
        },
        {
          path: 'Automations',
          element:<><Automations /><Footer /></>,
        },
        {
          path: 'contacts',
          element:<><Contacts /><Footer /></>,
        },
        {
          path: 'Templates/Preview',
          element: <Preview />,
        },
      
        {
          path: 'Templates/SelectTemplate',
          element: <SelectTemplate />,
        },
      
        {
          path: 'Templates/SavedPreview',
          element: <SavedPreview />,
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

    
  ]);

  return <RouterProvider router={router} />;
}

export default App;
