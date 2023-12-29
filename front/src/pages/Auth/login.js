import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Label,
  Input,
  Form,
  FormFeedback,
} from "reactstrap";
import axios from 'axios';
import toast from 'react-hot-toast';
import * as Yup from "yup";
import { useFormik } from "formik";

//Import Home Button
import AccountHomeButton from "./account-home-button";

const Login = () => {
  const navigate = useNavigate();

  const toggleThem = () => {
    if (document.body.getAttribute("data-bs-theme") === "light") {
      document.body.setAttribute("data-bs-theme", "dark");
    } else {
      document.body.setAttribute("data-bs-theme", "light");
    }
  };

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your email"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Please Enter Your Password")
    }),
    onSubmit: (values) => {
      console.log("values", values);
      axios.post(`http://localhost:8080/admins/login`, values)
        .then((res) => {
          localStorage.setItem('ADMIN', JSON.stringify(res.data.message));
          localStorage.setItem("isLoggedIn", true);
          toast.success('Connexion réussi !');
          navigate("/")
        }).catch((err) => {
          toast.error('Connexion echoué !')
        })
    }
  });

  useEffect(() => {
    document.body.classList.add("bg-account-pages");
    document.body.classList.add("py-4");
    document.body.classList.add("py-sm-0");
    document.getElementById("colorTheme").setAttribute("href", "assets/colors/red.css")


    // Define the cleanup function to remove the added classes
    return () => {
      document.body.classList.remove("bg-account-pages");
      document.body.classList.remove("py-4");
      document.body.classList.remove("py-sm-0");
      document.getElementById("colorTheme").setAttribute("href", "assets/colors/cyan.css")

    };
  }, []);
  return (
    <React.Fragment>
      {/* render home button */}
      <AccountHomeButton />

      <Link to="#" id="mode" className="mode-btn text-white" onClick={() => toggleThem()}>
        <i className="mdi mdi-weather-sunny bx-spin mode-light"></i>
        <i className="mdi mdi-moon-waning-crescent mode-dark"></i>
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
                        <h3 className="font-weight-bold">
                          <Link
                            to="/"
                            className="text-dark text-uppercase account-pages-logo"
                          >
                            <i className="mdi mdi-alien"></i>Dylan
                          </Link>
                        </h3>
                        <p className="text-muted">
                          Sign in to continue.
                        </p>
                      </div>
                      <div className="p-4">
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
                              className="form-control "
                              placeholder="Enter email"
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
                          </div>

                          <div className="form-group mt-3">
                            <Label for="userpassword">Password</Label>
                            <Input
                              name="password"
                              className="form-control "
                              placeholder="Enter password"
                              type="password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.password || ""}
                              invalid={
                                validation.touched.password && validation.errors.password ? true : false
                              }
                            />
                            {validation.touched.password && validation.errors.password ? (
                              <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                            ) : null}
                          </div>

                          <div className="custom-control custom-checkbox mt-2">
                            <Input
                              type="checkbox"
                              className="custom-control-input"
                              id="customControlInline"
                            />{" "}
                            <Label
                              className="custom-control-label"
                              for="customControlInline"
                            >
                              &nbsp;Remember me
                            </Label>
                          </div>

                          <div className="d-grid mt-3">
                            <Button
                              type="submit"
                              className="btn btn-primary"
                            >
                              Log In
                            </Button>
                          </div>

                          <div className="mt-4 mb-0 text-center">
                            <Link to="/password_forget" className="text-dark">
                              <i className="mdi mdi-lock"></i> Forgot your
                              password?
                            </Link>
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
}
export default Login;
