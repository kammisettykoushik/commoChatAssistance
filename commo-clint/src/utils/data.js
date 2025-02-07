import { Whatsapp, CallCalling, SmsNotification } from "iconsax-react";
import { FaEnvelope,FaPhoneAlt,FaSms } from "react-icons/fa";
import email from "./../assets/images/email.png";
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
      path: "/Features/SMS",
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
        imageUrl:
          "https://www.movylo.com/wp-content/uploads/2022/09/whatsapp-marketing.jpg",
        heading: "WhatsApp Marketing",
        description:"Leverage WhatsApp Marketing to build strong customer relationships and deliver personalized, impactful campaigns.",
      },
      {
        id: 2,
        imageUrl:
          "https://media.licdn.com/dms/image/v2/D4E12AQFzT2eXu8I9cg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1698343157543?e=2147483647&v=beta&t=o8gCXQXXr3SgOorkOBRq_Eqfd9K-aueoP46KKgRhRfQ",
        heading: "Email Marketing",
        description:"Enhance customer engagement with personalized email campaigns that deliver relevant content at the right time.",
      },
      {
        id: 3,
        imageUrl:
          "https://assets.mailshake.com/wp-content/uploads/2021/08/01114115/1477625_Update-Old-Blog-Images_10_102722.jpg",
        heading: "ColdCalling",
        description: "Enhance outreach with Cold Calling by reaching potential customers through personalized, direct communication.",
      },
      {
        id: 4,
        imageUrl:
          "https://www.moengage.com/wp-content/uploads/Personalized-Push-Notifications@2x.webp",
        heading: "SMS Marketing",
        description: "Boost customer engagement with SMS Marketing by delivering quick, personalized, and impactful messages directly to their phones.",
      },
      {
        id: 5,
        imageUrl:
          "https://www.moengage.com/wp-content/uploads/onsite-messaging-4.webp",
        heading: "Email Campaigns",
        description: "Boost customer engagement with targeted Email Campaigns that deliver personalized and timely messages.",
      },
      {
        id: 6,
        imageUrl:
          "https://water.r.worldssl.net/assets/images/blog-WhatIsBulkSmsMarketing_20211104-01.jpg",
        heading: "Bulk SMS Marketing",
        description:"Boost your reach with Bulk SMS Marketing by sending targeted, impactful messages to a large audience instantly.",
      },
    ];

    const whatsappmarketingNavigation = {
      path:"/whatsappmarketing",
      icon:  <Whatsapp size="40" color="#074799" />,
      navigationLinks:[
        { label: "Team Inbox", path: "/whatsappmarketing/TeamInbox"},
        { label: "Message Templates", path: "/whatsappmarketing/Templates" },
        { label: "Broadcast", path: "/whatsappmarketing/BroadCast" },
        { label: "Automations", path: "/whatsappmarketing/Automations" },
        { label: "Contacts", path: "/whatsappmarketing/Contacts" },
      ]
    }
    const emailMarketingNavigation = {
      path:"/emailmarketing",
      icon:  <FaEnvelope size={25} color="#074799" />,
      navigationLinks:[
        { label: "Overview", path: "/emailmarketing/Overview"},
        { label: "ContactPage", path: "/emailmarketing/ContactPage" },
        { label: "Campaigns", path: "/emailmarketing/Campaigns" },
        { label: "Automations", path: "/emailmarketing/AutomationsScreen" },
      ]
    }
    const coldCallingMarketingNavigation = {
      path:"/coldcallingmarketing",
      icon: <FaPhoneAlt size={20} color="#074799" />,
      navigationLinks:[
        { label: "Contacts", path: "/coldcallingmarketing/Contactslist"},
        { label: "Campaigns", path: "/coldcallingmarketing/CampaignsScreen" },
        { label: "History", path: "/coldcallingmarketing/History" },
        { label: "Dashboard", path: "/coldcallingmarketing/Dashboard" },
      ]
    }
    const smsMarketingNavigation = {
      path:"/smsmarketing",
      icon:<FaSms size={25} color="#074799" />,
      navigationLinks:[
        { label: "Contacts", path: "/smsmarketing/Contactsms"},
        { label: "SMS Sender", path: "/smsmarketing/SmsSender" },
        { label: "Message", path: "/smsmarketing/Message" },
        { label: "Automations", path: "/smsmarketing/Automationssms" },
        { label: "Dashboard", path: "/smsmarketing/Dashboard" },
      ]
    }
 
    export {whatsappmarketingNavigation,emailMarketingNavigation,coldCallingMarketingNavigation,contentData,smsMarketingNavigation}





    // export {contentData}