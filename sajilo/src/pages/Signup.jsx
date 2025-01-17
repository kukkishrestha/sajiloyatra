import React from 'react'
import CommonSection from '../components/UI/CommonSection'
import Helmet from '../components/Helmet/Helmet'
import Signups from '../components/UI/Signup';
import { Container, Row, Col } from 'reactstrap';

const Signup = () => {
  return (
    <Helmet title='About'>
    
    <Signups/>

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

export default Signup
