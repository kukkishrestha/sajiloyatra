import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import '../../styles/about-section.css'
import aboutImg from '../../assets/all-images/cars-img/nissan-offer.png'

const AboutSection = () => {
  return <section>
    <Container>
        <Row>
            <Col lg='6' md='6'>
            
                <div className="about__section-content">
                    <h4 className="section__subtitle">About Us</h4>
                    <h2 className="section__title">Welcome to Sajilo Yatra Service</h2>
                    <p className="section__description">
                    Sajilo Yatra aims to modernize and streamline the vehicle rental process by 
                    replacing traditional, manual methods with an user-friendly system.
                    This project focuses on the development of a comprehensive Vehicle Rental Management System 
                    that streamlines the processes of renting vehicles, improving both operational efficiency and customer experience.
                    </p>

                    <div className="about__section-item d-flex align-items-center">
                        <p className="section__description d-flex align-items-center gap-2">
                        <i class="ri-checkbox-circle-line"> </i>Sajilo Yatra
                        </p>

                        <p className="section__description d-flex align-items-center gap-2">
                        <i class="ri-checkbox-circle-line"></i> Sajilo Yatra
                        </p>
                    </div>

                    <div className="about__section-item d-flex align-items-center">
                        <p className="section__description d-flex align-items-center gap-2">
                        <i class="ri-checkbox-circle-line"></i> Sajilo Yatra
                        </p>

                        <p className="section__description d-flex align-items-center gap-2">
                        <i class="ri-checkbox-circle-line"> </i>Sajilo Yatra
                        </p>
                    </div>
                    
                </div>

         
            </Col>
            <Col lg='6' md='6'>
            <div className="about__img">
                <img src={aboutImg} alt='' className='w-100'></img>
            </div>
            </Col>
        </Row>
    </Container>
  </section>
}

export default AboutSection
