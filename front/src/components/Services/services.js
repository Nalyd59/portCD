import React, { Component } from "react";
import { Container, Row } from "reactstrap";

//Import Section Title
import SectionTitle from "../common/section-title";

//Import Service Box
import ServiceBox from "./service-box";

class Services extends Component {
  state = {
    services: [
      {
        title: "GESTION DE PROJETS WEB",
        icon: "pe-7s-diamond",
        description:
          "Site vitrine, corporate, évènementiel, e-commerce, intranet, application mobile.",
      },
      {
        title: "INTÉGRATION WEB",
        icon: "pe-7s-display2",
        description:
          "Des intégrations HTML / CSS respectueuses des standards du Web.",
      },
      {
        title: "DYNAMISME DES PAGES",
        icon: "pe-7s-piggy",
        description:
          "Des animations de contenu non intrusives pour embellir votre projet.",
      },
      {
        title: "INTERFACE D'ADMINISTRATION",
        icon: "pe-7s-diamond",
        description:
          "Outils spécifiques au bon fonctionnement de votre entreprise.",
      },
      {
        title: "RESPONSIVE DESIGN",
        icon: "pe-7s-display2",
        description:
          "Compatible tous supports, tablette & application mobile.",
      },
      {
        title: "RÉFÉRENCEMENT NATUREL",
        icon: "pe-7s-piggy",
        description:
          "Affichage sémantique des informations, des pages propres pour un référencement optimal.",
      },
    ],
  };
  render() {
    return (
      <React.Fragment>
        <section className="section bg-light" id="services">
          <Container>
            {/* Render section title */}
            <SectionTitle
              title="Services"
              description="
              Je crée une réflexion digitale, graphique et dimensionnelle pour concevoir des expériences de marque de premier plan dans leur catégorie, porteuses de sens et apportant une valeur ajoutée à mes clients."
            />

            <Row className="mt-5">
              {/* render service box */}
              {this.state.services.map((service, key) => (
                <ServiceBox
                  key={key}
                  title={service.title}
                  icon={service.icon}
                  description={service.description}
                />
              ))}
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}

export default Services;
