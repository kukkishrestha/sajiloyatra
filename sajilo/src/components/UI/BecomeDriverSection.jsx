import React from "react";
import "../../styles/become-driver.css";
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from "reactstrap";

import driverImg from "../../assets/all-images/toyota-offer-2.png";

const BecomeDriverSection = () => {

  const navigate= useNavigate();
  return (
    <section className="become__driver">
      <Container>
        <Row>
          <Col lg="6" md="6" sm="12" className="become__driver-img">
            <img src={driverImg} alt="" className="w-100" />
          </Col>

          <Col lg="6" md="6" sm="12">
            <h2 className="section__title become__driver-title">
              Do You Want to Hire a Driver?
            </h2>

            <button onClick={() =>navigate("/DriverForm")} className="btn become__driver-btn mt-4">
              Hire a Driver
            </button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BecomeDriverSection;