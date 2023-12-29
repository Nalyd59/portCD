import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Label,
  Form,
  Input,
  FormFeedback,
} from "reactstrap";



// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

//Import Home Button
import AccountHomeButton from "./account-home-button";

const PasswordForget = () => {
 const toggleThem = () => {
    if (document.body.getAttribute("data-bs-theme") === "light") {
      document.body.setAttribute("data-bs-theme", "dark");
    } else {
      document.body.setAttribute("data-bs-theme", "light");
    }
  };

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
    }),
    onSubmit: (values) => {
      console.log("values", values);
    },
  });

  useEffect(() => {
    document.body.classList.add("bg-account-pages");
    document.body.classList.add("py-4");
    document.body.classList.add("py-sm-0");
    document.getElementById("colorTheme").setAttribute("href","assets/colors/red.css")
    
    // Define the cleanup function to remove the added classes
    return () => {
      document.body.classList.remove("bg-account-pages");
      document.body.classList.remove("py-4");
      document.body.classList.remove("py-sm-0");
      document.getElementById("colorTheme").setAttribute("href","assets/colors/cyan.css")
    };
  }, []);
  return (
    <React.Fragment>
      {/* render home button */}
      <AccountHomeButton />
      {/* <!-- light-dark mode --> */}

      <Link to="#" id="mode" class="mode-btn text-white" onClick={() => toggleThem()}>
        <i class="mdi mdi-weather-sunny bx-spin mode-light"></i>
        <i class="mdi mdi-moon-waning-crescent mode-dark"></i>
      </Link>
      <section className="vh-100">
        <div className="display-table">
          <div className="display-table-cell">
            <Container>
              <Row className="justify-content-center">
                <Col lg="5">
                  <Card className="account-card">
                    <CardBody>
                      <div className="text-center mt-3">
                        <h3 className="fw-bold">
                          <Link
                            to="/"
                            className="text-dark text-uppercase account-pages-logo"
                          >
                            <i className="mdi mdi-alien"></i>Hiric
                          </Link>
                        </h3>
                        <p className="text-muted">Reset Password</p>
                      </div>
                      <div className="p-4">
                        <div
                          className="alert alert-warning  text-center"
                          role="alert"
                        >
                          Enter your email address and we'll send you an email
                          with instructions to reset your password.
                        </div>
                        <Form
                          onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                          }}
                        >
                          <div className="form-group">
                            <Label for="email">Email</Label>
                            <Input
                              name="email"
                              className=""
                              placeholder="Enter Email"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.email || ""}
                              invalid={
                                validation.touched.email &&
                                validation.errors.email
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.email &&
                            validation.errors.email ? (
                              <FormFeedback type="invalid">
                                {validation.errors.email}
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="d-grid mt-3">
                            <Button type="submit" color="primary" className="btn btn-primary">
                              Reset your Password
                            </Button>
                          </div>
                        </Form>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default PasswordForget;
