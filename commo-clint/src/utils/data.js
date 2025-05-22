import { Whatsapp, CallCalling, SmsNotification } from "iconsax-react";
import { FaEnvelope,FaPhoneAlt,FaSms } from "react-icons/fa";
import email from "./../assets/images/email.png";
import whatsappmarketing from "./../assets/homescreenimages/whatsappmarketing.jpg";
import emailmarketing from "./../assets/homescreenimages/emailmarketing.jpg";
import coldcalling from "./../assets/homescreenimages/coldcallingmarketing.jpg";
import smsmarketing from "./../assets/homescreenimages/smsmarketing.jpg";
const servicesData = [
    {
      id: 1,
      name: "WhatsApp Marketing",
      Icon: <Whatsapp size="32" color="white" />,
      path: "/Features/WhatsAppMarketing",
    },
    {
      id: 2,
      name: "Email Marketing",
      Icon: <img src={email} alt="Email Marketing" width={32} height={32} />,
      path: "/Features/EmailMarketing",
    },
    {
      id: 3,
      name: "Cold Calling Marketing",
      Icon: <CallCalling size="32" color="white" />,
      path: "/Features/ColdCalling",
    },
    {
      id: 4,
      name: "SMS Marketing",
      Icon: <SmsNotification size="32" color="white" />,
      path: "/Features/SMSMarketingPage",
    },
  ];

  export default servicesData;

  const clintServices = [
    { id: 1, name: "WhatsApp Marketing", color: "rgba(255, 99, 71, 0.6)" },
    { id: 2, name: "Email Marketing", color: "rgba(60, 179, 113, 0.6)" },
    { id: 3, name: "Cold Calling Marketing", color: "rgba(100, 149, 237, 0.6)" },
    { id: 4, name: "SMS", color: "rgba(255, 165, 0, 0.6)" },
    { id: 5, name: "Bulk SMS Marketing", color: "rgba(72, 209, 204, 0.6)" },
  ];
  export {clintServices};


  const contentData = [
    {
      id: 1,
      image: whatsappmarketing,
      heading: "WhatsApp Marketing",
      description:"Leverage WhatsApp Marketing to build strong customer relationships and deliver personalized, impactful campaigns.",
    },
    {
      id: 2,
      image: emailmarketing,
      heading: "Email Marketing",
      description:"Enhance customer engagement with personalized email campaigns that deliver relevant content at the right time.",
    },
    {
      id: 3,
      image: coldcalling,
      heading: "ColdCalling",
      description: "Enhance outreach with Cold Calling by reaching potential customers through personalized, direct communication.",
    },
    {
      id: 4,
      image: smsmarketing,
      heading: "SMS Marketing",
      description: "Boost customer engagement with SMS Marketing by delivering quick, personalized, and impactful messages directly to their phones.",
    },
  ];

    const whatsappmarketingNavigation = {
      path:"/",
      icon:  <Whatsapp size="40" color="#074799" />,
      navigationLinks:[
        { label: "Home", path: "/whatsappmarketing" },
        { label: "Team Inbox", path: "/whatsappmarketing/TeamInbox"},
        { label: "Message Templates", path: "/whatsappmarketing/Templates" },
        { label: "Broadcast", path: "/whatsappmarketing/BroadCast" },
        // { label: "Automations", path: "/whatsappmarketing/Automations" },

        // { label: "Automations", path: "/whatsappmarketing/Automations" },
        { label: "Contacts", path: "/whatsappmarketing/WhatsappContactList" },
      ]
    }
    const emailMarketingNavigation = {
      path:"/",
      icon:  <FaEnvelope size={25} color="#074799" />,
      navigationLinks:[
        { label: "Home", path: "/emailmarketing" },
        { label: "Campaigns", path: "/emailmarketing/Campaigns" },
        { label: "Overview", path: "/emailmarketing/Overview"},
        { label: "ContactPage", path: "/emailmarketing/CampaignList" },
        { label: "Automations", path: "/emailmarketing/AutomationsScreen" },
      ]
    }
    const coldCallingMarketingNavigation = {
      path:"/",
      icon: <FaPhoneAlt size={20} color="#074799" />,
      navigationLinks:[
        { label: "Home", path: "/coldcallingmarketing" },
        { label: "Contacts", path: "/coldcallingmarketing/Contactslist"},
        { label: "Campaigns", path: "/coldcallingmarketing/CampaignsScreen" },
        { label: "History", path: "/coldcallingmarketing/History" },
        { label: "Dashboard", path: "/coldcallingmarketing/Dashboard" },
      ]
    }
    const smsMarketingNavigation = {
      path:"/",
      icon:<FaSms size={25} color="#074799" />,
      navigationLinks:[
        { label: "Home", path: "/smsmarketing" },
        { label: "Message", path: "/smsmarketing/Message" },
        { label: "Campaign", path: "/smsmarketing/Campaignsms" },
        { label: "SMS Sender", path: "/smsmarketing/SmsSender" },
        { label: "Dashboard", path: "/smsmarketing/Dashboardsms" },
        { label: "Contacts", path: "/smsmarketing/Contactsms"},
        { label: "Automations", path: "/smsmarketing/Automationssms" },
      
      ]
    }
 
export {whatsappmarketingNavigation,emailMarketingNavigation,coldCallingMarketingNavigation,contentData,smsMarketingNavigation}
