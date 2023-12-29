import React from "react";
import { Container, Row, Col, Button, FormFeedback, Form, Input } from "reactstrap";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

//Import Section Title
import SectionTitle from "../common/section-title";

const ContactUs = () => {
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
        name: '',
        email: '',
        subject: '',
    },
    validationSchema: Yup.object({
        name: Yup.string().required("Please Enter Your Name"),
        email: Yup.string().required("Please Enter Your Email"),
        subject: Yup.string().required("Please Enter Your Subject"),
    }),
    onSubmit: (values) => {
        console.log("values",values);
    }
});
    return (
      <React.Fragment>
        <section className="section " id="contact">
          <Container>
            {/* Render section title */}
            <SectionTitle
              title="Contact"
              description="C'est avec plaisir que je vous invite à me contacter en remplissant le formulaire ci-dessous. Je suis impatient de vous trouver des solutions adaptées. Votre message est important pour moi, et je m'efforcerai de vous répondre dans les plus brefs délais"
            />
                <div className="custom-form mt-4 pt-4">
                <p id="error-msg"></p>
                  <div id="message"></div>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                  }}>
                    <Row>
                      <Col lg="6 mt-2">
                      <Input
                          name="name"
                          className=""
                          placeholder="Your name*"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.name || ""}
                          invalid={
                              validation.touched.name && validation.errors.name ? true : false
                          }
                      />
                      {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                      ) : null}
                      </Col>
                      <Col lg="6 mt-2">
                      <Input
                            name="email"
                            className=""
                            placeholder="Your email*"
                            type="email"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}
                            invalid={
                                validation.touched.email && validation.errors.email ? true : false
                            }
                        />
                        {validation.touched.email && validation.errors.email ? (
                            <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                        ) : null}
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12 mt-2">
                      <Input
                            name="subject"
                            className=""
                            placeholder="Your Subject.."
                            type="text"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.subject || ""}
                            invalid={
                                validation.touched.subject && validation.errors.subject ? true : false
                            }
                        />
                        {validation.touched.subject && validation.errors.subject ? (
                            <FormFeedback type="invalid">{validation.errors.subject}</FormFeedback>
                        ) : null}
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12 mt-2">
                        <div className="form-group">
                          <textarea
                            name="comments"
                            id="comments"
                            rows="4"
                            className="form-control"
                            placeholder="Your message..."
                          ></textarea>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12" className="text-end">
                        <Button className="submitBnt btn btn-primary">
                          Send Message
                        </Button>
                        <div id="simple-msg"></div>
                      </Col>
                    </Row>
                  </Form>
                </div>
          </Container>
        </section>
      </React.Fragment>
    );
}

export default ContactUs;
