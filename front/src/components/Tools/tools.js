import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

class Clients extends Component {
  state = {
    tools: [
      { id: 1, img: "assets/images/tools/1.png" },
      { id: 2, img: "assets/images/tools/2.png" },
      { id: 3, img: "assets/images/tools/3.png" },
      { id: 4, img: "assets/images/tools/4.png" },
    ],
  };
  render() {
    return (
      <React.Fragment>
        <section className="section-sm bg-light">
          <Container>
            <Row>
              {this.state.tools.map((tool, key) => (
                <Col md="3" key={key}>
                  <div className="client-images my-3 my-md-0">
                    <img
                      src={tool.img}
                      alt="logo-img"
                      className="mx-auto img-fluid d-block"
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}

export default Clients;
