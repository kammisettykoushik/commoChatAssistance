import React, { useEffect } from "react";
import Clients from "../ourclints/Client";
import Services from "./Services";
import WhatsAppContent from "./WhatsAppContent";
import Footer from "../../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
const TeamInbox = () => {
  return (
    <div>
      <Clients />
      <Services />
      <WhatsAppContent />
      <Footer />
    </div>
  );
};
export default TeamInbox;
