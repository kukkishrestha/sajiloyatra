import React from 'react'
import CommonSection from '../components/UI/CommonSection'
import Helmet from '../components/Helmet/Helmet'
import Logins from '../components/UI/Login';
import { Container, Row, Col } from 'reactstrap';

const Login = () => {
  return (
    <Helmet title='About'>
    
    <Logins/>

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

export default Login
