import React from "react";
import styles from "./Client.module.scss";
import { clintServices } from "./../../utils/data";

const Clients = () => {
  const radius = 150;
  const centralCircleSize = 100;
  const smallCircleSize = 100;

  return (
    <>
      <div className={`${styles.servicesContainer}`}>
        <div className={styles.aboutServices}>
          <h1 className={styles.animatedTitle}>Welcome To Our Services</h1>
          <p className={styles.aboutText}>
            Explore a range of innovative marketing strategies and tools
            designed to boost your brand's visibility and growth.
          </p>
          <div className={styles.buttonGroup}>
            <button className={styles.demoButton}>Book Demo</button>
            <button className={styles.trialButton}>Free Trial</button>
          </div>
        </div>

        <div className={styles.circleWrapper}>
          <div
            className={styles.mainCircle}
            style={{
              width: `${centralCircleSize}px`,
              height: `${centralCircleSize}px`,
            }}
          >
            Services
          </div>
          {clintServices.map((service, index) => {
            const angle = (index * 360) / clintServices.length;
            const x = radius * Math.cos((angle * Math.PI) / 180);
            const y = radius * Math.sin((angle * Math.PI) / 180);

            return (
              <div
                key={service.id}
                className={styles.serviceCircle}
                style={{
                  top: `calc(50% + ${y}px)`,
                  left: `calc(50% + ${x}px)`,
                  backgroundColor: service.color,
                  width: `${smallCircleSize}px`,
                  height: `${smallCircleSize}px`,
                }}
              >
                {service.name}
              </div>
            );
          })}
        </div>
      </div>
      <div className="container" style={{ marginTop: 50 }}>
        <div className="row align-items-center">
          {/* Image Section */}
          <div className="col-lg-6 col-md-12 d-flex justify-content-center">
            <img
              src="https://www.kovaion.com/wp-content/uploads/2022/12/Why-Kovaions-WhatsApp-Business-Marketing-Tool.png"
              alt="Marketing Tool"
              className={styles.clintImage}
            />
          </div>
          {/* Content Section */}
          <div className="col-lg-6 col-md-12">
            <div className={styles.clientContent}>
              <b>Why Choose Us</b>
            </div>
            <h1 style={{ marginTop: 20 }}>
              <b style={{ color: "blue", fontSize: 30 }}>Why</b> Commo Whatsapp
              Business Marketing Tool?
            </h1>
            <p style={{ color: "gray", fontSize: 20 }}>
              Commo is one of the suitable bulk business WhatsApp marketing
              platforms for small to enterprise businesses. Here are some of the
              major reasons to use Kovaion’s bulk WhatsApp business marketing
              software.
            </p>
            <ul style={{ lineHeight: 2, color: "gray", fontSize: 20 }}>
              <li>Create intuitive templates</li>
              <li>Create intuitive templates</li>
              <li>Create intuitive templates</li>
              <li>Create intuitive templates</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Clients;
