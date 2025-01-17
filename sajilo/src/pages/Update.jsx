import React from 'react'

import CommonSection from '../components/UI/CommonSection'
import Helmet from '../components/Helmet/Helmet'
import Updates from "../components/UI/Update";
import { Container, Row, Col } from 'reactstrap';



const Update = () => {
  return (
  <Helmet title='About'>
    <CommonSection title='Update'/>
    <Updates/>

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

export default Update;
