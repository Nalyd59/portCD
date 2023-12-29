import React, { useState, useEffect } from "react";
import { Container, Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, Button } from "reactstrap";
import ScrollspyNav from "./scrollSpy";
import StickyHeader from "react-sticky-header";
import "../../../node_modules/react-sticky-header/styles.css";
import "./navbar.css"
const NavbarPage = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const navItems = [
    { id: 1, idnm: "home", navheading: "Home" },
    { id: 2, idnm: "services", navheading: "Services" },
    { id: 3, idnm: "projects", navheading: "Projects" },
    { id: 4, idnm: "contact", navheading: "Contact" },
  ];

  const windowScroll = () => {
    const navbar = document.getElementById("navbar");
    if (window.scrollY >= 50) {
      navbar.classList.add("nav-sticky");
    } else {
      navbar.classList.remove("nav-sticky");
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', windowScroll);
    return () => {
      window.removeEventListener('scroll', windowScroll);
    };
  }, []);

  const toggle = () => {
    setIsOpenMenu(!isOpenMenu);
  };
  const logout = () => {
    localStorage.clear();
  };

  let targetIds = navItems.map((item) => item.idnm);

  return (
    <StickyHeader
      header={
        <Navbar className={`navbar navbar-expand-lg fixed-top navbar-custom sticky sticky-dark`} id="navbar">
          <Container>

            <NavbarToggler data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" onClick={toggle}>
              <i className="mdi mdi-menu"></i>
            </NavbarToggler>

            <Collapse id="navbarCollapse" isOpen={isOpenMenu} navbar>
              <ScrollspyNav
                scrollTargetIds={targetIds}
                activeNavClass="active"
                scrollDuration="800"
                headerBackground="true"
              >
                <Nav className="navbar-nav navbar-center" id="mySidenav">
                <a href="/" style={{padding:'15px  8px', color:'#fff',textAlign:'center'}}><i className="mdi mdi-alien"></i>Dylan</a>
                  {navItems.map((item, key) => (
                    <NavItem key={key} className={item.navheading === "Home" ? "active" : ""}>
                      <NavLink href={"#" + item.idnm} style={{textAlign:'center'}}>{item.navheading}</NavLink>
                    </NavItem>
                  ))}
                </Nav>
              </ScrollspyNav>
              {localStorage.getItem("isLoggedIn") === "true" && (
                <div style={{textAlign:'center'}}>
                  <a href="/dashboard" style={{margin:'10px', padding:'12px', color:'#fff'}}>Dashboard</a>
                </div>
              )}
              <div className="nav-button ms-auto">
                <Nav className="navbar-right nav" navbar>
                  <NavItem>
                    {localStorage.getItem("isLoggedIn") === "true" ? (
                      <Button style={{float:'right'}} type="button" color="primary" className="navbar-btn btn-rounded waves-effect waves-light">
                        <a href="/" onClick={logout}>Déconnexion</a>
                      </Button>
                    ) : (
                      <Button type="button" color="primary" className="navbar-btn btn-rounded waves-effect waves-light">
                        <a href="/login">Connexion</a>
                      </Button>
                    )}
                  </NavItem>
                </Nav>
              </div>
            </Collapse>
          </Container>
        </Navbar>
      }
      stickyOffset={-100}
    />
  );
};

export default NavbarPage;