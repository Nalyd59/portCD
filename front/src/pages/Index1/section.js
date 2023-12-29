import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

class Section extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
    this.callModal.bind(this);
  }

  callModal = () => {
    this.refs.child.openModal();
  };

  render() {
    return (
      <React.Fragment>
        <section className="section bg-home home-half" id="home" data-image-src="images/bg-home.jpg">
          <div className="bg-overlay"></div>
          <Container>
            <Row>
              <Col
                lg={{ size: 8, offset: 2 }}
                className="text-white text-center"
              >
                <h4 className="home-small-title">CREPIN Dylan</h4>
                <h1 className="home-title">
                  Développeur web full stack
                </h1>
                <p className="pt-3 home-desc mx-auto">
                  Bienvenue sur mon portfolio ! Je suis un développeur web Full Stack passionné, spécialisé dans la création d'applications modernes et réactives.
                  Mon expertise s'étend des interfaces utilisateur dynamiques côté client à la gestion robuste des données côté serveur.
                </p>
              </Col>
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}

export default Section;
