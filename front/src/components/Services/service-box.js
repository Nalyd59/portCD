import React, { Component } from "react";
import { Col } from "reactstrap";

class ServiceBox extends Component {
  render() {
    return (
      <React.Fragment>
        <Col lg="4" className="mt-4">
          <div className="services-box p-3">
            <div className="d-flex align-items-center">
              <i className={`${this.props.icon} text-primary h2`}></i>
              <div className="ms-4">
                <h4 className="mb-0">{this.props.title}</h4>
                <p className="pt-2 text-muted">{this.props.description}</p>
              </div>
            </div>
          </div>
        </Col>
      </React.Fragment>
    );
  }
}

export default ServiceBox;
