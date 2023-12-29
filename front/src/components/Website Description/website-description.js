import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

class WebsiteDescription extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="section bg-web-desc">
          <div className="bg-overlay"></div>
          <Container>
            <Row>
              <Col lg="12" className="text-center">
                <h2 className="text-white">Télécharger mon CV</h2>
                <Link
                  to="#"
                  className="btn btn-light mt-5 waves-effect waves-light"
                >
                  Clique ici
                </Link>
              </Col>
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}

export default WebsiteDescription;
