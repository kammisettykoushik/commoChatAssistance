import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import servicesData from "./../../utils/data";
import styles from "./Services.module.scss";

const Services = () => {
  return (
    <div className={`${styles.serviceContainer}  ${"container my-5"}`}>
      <h1 className={styles.textCenterWhite}>Explore Our Services</h1>
      <div className="row justify-content-center g-3">
        {servicesData.map((service, index) => (
          <div
            key={service.id}
            className="col-6 col-md-3 px-2 d-flex justify-content-center"
            style={{ textAlign: "center" }}
          >
            <Link to={service.path} style={{ textDecoration: "none" }}>
              <div
                className={`${styles.card} ${
                  index % 2 === 0 ? styles.even : styles.odd
                }  ${"card-hover"}`}
              >
                <div className={styles.circleContainer}>{service.Icon}</div>
                <p className={` ${styles.textbold}  ${"mt-3 text-center"}`}>
                  {service.name}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
