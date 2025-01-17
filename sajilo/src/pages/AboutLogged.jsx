import React from 'react'

import CommonSection from '../components/UI/CommonSection'
import Helmet from '../components/Helmet/Helmet'
import AboutSection from "../components/UI/AboutSection";
import { Container, Row, Col } from 'reactstrap';
import BecomeDriverSection from '../components/UI/BecomeDriverSection';


const About = () => {
  return (
  <Helmet title='About'>
    <CommonSection title='About Us'/>
    <AboutSection/>

    <section className="about__page-section">
      <Container>
        <Row>
          <Col lg='6' md='6' sm='12'>
          <div className="about__page-img">
            <img  src=''></img>
          </div>
          </Col>
        </Row>
      </Container>
    </section>

  </Helmet>
  )
}

export default About
