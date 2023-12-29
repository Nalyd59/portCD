import React, { Component } from "react";
import { Container, Row } from "reactstrap";
import axios from "axios";
import SectionTitle from "../common/section-title";
import ProjectBox from "./project-box";

class Projects extends Component {
  state = {
    projects: [],
  };

  componentDidMount() {
    axios.get("http://localhost:8080/projects/get")
      .then(response => {
        this.setState({ projects: response.data });
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des données des projets:", error);
      });
  }

  render() {
    return (
      <React.Fragment>
        <section className="section bg-light active" id="projects">
          <Container>
            <SectionTitle
              title="Projects"
              description="Retrouvez ici la liste complète de mes projets, que vous êtes invités à explorer et à visiter pour découvrir mon travail créatif et mes réalisations."
            />
            <Row className="mt-4">
              {this.state.projects.map((project, key) => (
                <ProjectBox key={key} project={project} />
              ))}
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}

export default Projects;