import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col } from "reactstrap";

class ProjectBox extends Component {
  render() {
    return (
      <React.Fragment>
        <Col lg="4">
          <div className="card blog-box mt-4">
            <img
              src={`http://localhost:8080/images/projects/${this.props.project.image}`}
              className="card-img-top img-fluid rounded"
              alt={this.props.project.title}
            />
            <div className="card-body">
              <h4 className="card-title mt-3">
                <Link to={this.props.project.link} className="text-decoration-none text-dark">
                  {this.props.project.title}
                </Link>
              </h4>
              <p className="card-text text-muted">{this.props.project.description}</p>
              <div className="mt-3">
                <Link to={this.props.project.link} className="btn btn-primary">
                  Read More <i className="mdi mdi-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </Col>
      </React.Fragment>
    );
  }
}

export default ProjectBox;
