import React from 'react'

import CommonSection from '../components/UI/CommonSection'
import Helmet from '../components/Helmet/Helmet'
import Profile from "../components/UI/Profile";
import { Container, Row, Col } from 'reactstrap';



const About = () => {
  return (
  <Helmet title='About'>
    <CommonSection title='Profile'/>
    <Profile/>

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
