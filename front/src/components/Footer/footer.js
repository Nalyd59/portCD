import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

const FooterLinks = () => {
  const socials = [
    { icon: "mdi mdi-facebook", link: "#" },
    { icon: "mdi mdi-twitter", link: "#" },
    { icon: "mdi mdi-linkedin", link: "#" },
    { icon: "mdi mdi-google-plus", link: "#" },
    { icon: "mdi mdi-microsoft-xbox", link: "#" },
  ];

  return (
    <React.Fragment>
      <div className="footer-alt">
        <Container>
          <Row>
            <Col lg="12">
              <div className="float-sm-start pull-none">
                <p className="copy-rights  mb-3 mb-sm-0">
                  2023 © Dylan - Portfolio
                </p>
              </div>
              <div className="float-sm-end pull-none copyright ">
                <ul className="list-inline d-flex flex-wrap social m-0">
                  {socials.map((social, key) => (
                    <li className="list-inline-item" key={key}>
                      <Link to={social.link} className="social-icon">
                        <i className={social.icon}></i>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default FooterLinks;
