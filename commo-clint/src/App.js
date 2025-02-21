import './App.css';
import MainNavbarlist from './components/MainNavBar/MainNavbarlist';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import WhatsAppNavigation from './pages/whatsappmarketing/WhatsAppNavigation';
import ChildNavigatin from './components/MainNavBar/ChildNavigatin';

import Contacts from './pages/whatsappmarketing/Contact';
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
import { whatsappmarketingNavigation, emailMarketingNavigation, coldCallingMarketingNavigation, smsMarketingNavigation } from './utils/data';
import AutomationsScreen from './pages/emailmarketing/AutomationsScreen';
import Overview from './pages/emailmarketing/Overview';
import Campaigns from './pages/emailmarketing/Campaigns';
import ContactPage from './pages/emailmarketing/ContactPage';
import CampaignsScreen from './pages/coldcallingmarketing/CampaignsScreen';
import Contactslist from './pages/coldcallingmarketing/Contactslist';
import Dashboard from './pages/coldcallingmarketing/Dashboard';
import History from './pages/coldcallingmarketing/History';
import Dashboardsms from './pages/smsmarketing/Dashboardsms';
import Message from './pages/smsmarketing/Message';
import Automationssms from './pages/smsmarketing/Automationssms';
import Contactsms from './pages/smsmarketing/Contactsms';
import SmsSender from './pages/smsmarketing/SmsSender';
import NewCampaign from './pages/emailmarketing/NewCampaign';
import DesignCampaign from './pages/emailmarketing/DesignCampaign';
import DesignPreviewScreen from './pages/emailmarketing/DesignPreviewScreen';
import BroadCastDetailsScreens from './pages/whatsappmarketing/BroadCastDetails';
import Contact from './pages/whatsappmarketing/Contact';
import RegisterScreen from './components/MainNavBar/RegisterScreen';
import LoginScreen from './components/MainNavBar/LoginScreen';


function App() {

  const ChildNavigationMainLayout = (prop) =>

  (
    <>
      <ChildNavigatin data={prop?.data} icon={prop?.icon} />
      <Outlet />
    </>
  );
  const BroadCas = () => {
    return (
      <>
        <h1><><BroadCast /></></h1>
        <Outlet /> {/* This is required for nested routes */}
        <Footer />
      </>
    );
  };
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainNavbarlist />,
    },
    {
      path: '/RegisterScreen', 
      element: <><RegisterScreen /><Footer /></>,
    } ,   
    {
      path: '/LoginScreen', 
      element: <><LoginScreen /><Footer /></>,
    } ,   
    {
      path: '/whatsappmarketing',
      element: <ChildNavigationMainLayout data={whatsappmarketingNavigation} />,
      children: [
        {
          path: '',
          element: <><WhatsappLandingPage /><Footer /></>,
        },
        {
          path: "TeamInbox",
          element: <><TeamInbox /><Footer /></>,
        },
        {
          path: 'BroadCast',
          element: <BroadCas/>,
          children:[
            {
              path:"BroadCastDetailsScreen",
              element:<BroadCastDetailsScreens />
            }
          ]
        },
        // {
        //   path: 'BroadCastDetailsScreen',
        //   element: <><BroadCastDetailsScreens /><Footer /></>,
        // },
        
        {
          path: 'Templates',
          element: <><Templates /><Footer /></>,
        },
        {
          path: 'Automations',
          element: <><Automations /><Footer /></>,
        },
        {
          path: 'contacts',
          element: <><Contacts /><Footer /></>,
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
      path: '/Features/WhatsAppMarketing',
      element: <WhatsAppMarketing />,
    },

    {
      path: '/EmailMarketing',
      element: <ChildNavigationMainLayout data={emailMarketingNavigation} />,
      children: [
        {
          path: '',
          element: <WhatsappLandingPage />
        },
        {
          path: "AutomationsScreen",
          element: <><AutomationsScreen /><Footer /></>,
        },
        {
          path: "Campaigns",
          element: <><Campaigns /><Footer /></>,
        },
        {
          path: "ContactPage",
          element: <><ContactPage /><Footer /></>,
        },
        {
          path: "Overview",
          element: <><Overview /><Footer /></>,
        },
        {
          path: "Campaigns/NewCampaign",
          element: <><NewCampaign /><Footer /></>,
        },
        {
          path: "Campaigns/DesignCampaign",
          element: <><DesignCampaign /><Footer /></>,
        },
        {
          path: "Campaigns/DesignPreviewScreen",
          element: <><DesignPreviewScreen /><Footer /></>,
        },
      ]
    },
    {
      path: '/Coldcallingmarketing',
      element: <ChildNavigationMainLayout data={coldCallingMarketingNavigation} />,
      children: [
        {
          path: '',
          element: <WhatsappLandingPage />
        },
        {
          path: "CampaignsScreen",
          element: <><CampaignsScreen /><Footer /></>,
        },
        {
          path: "Contactslist",
          element: <><Contactslist /><Footer /></>,
        },
        {
          path: "Dashboard",
          element: <><Dashboard /><Footer /></>,
        },
        {
          path: "History",
          element: <><History /><Footer /></>,
        },
      ]
    },
    {
      path: '/smsMarketing',
      element: <ChildNavigationMainLayout data={smsMarketingNavigation} />,
      children: [
        {
          path: '',
          element: <WhatsappLandingPage />
        },
        {
          path: "Contactsms",
          element: <><Contactsms /><Footer /></>,
        },
        {
          path: "SmsSender",
          element: <><SmsSender /><Footer /></>,
        },
        {
          path: "Message",
          element: <><Message /><Footer /></>,
        },
        {
          path: "Automationssms",
          element: <><Automationssms /><Footer /></>,
        },
        {
          path: "Dashboard",
          element: <><Dashboard /><Footer /></>,
        },
      ]
    },


  ]);

  return <RouterProvider router={router} />;
}

export default App;