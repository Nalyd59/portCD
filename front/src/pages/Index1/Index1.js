import React, { Component } from 'react';
import NavbarPage from "../../components/Navbar/NavbarPage";
import Section from "./section";
import Tools from '../../components/Tools/tools';
import Services from '../../components/Services/services';
import WebsiteDescription from '../../components/Website Description/website-description';
import Projects from '../../components/Projects/Projects';
import Contact from '../../components/Contact/contact';
import Footer from '../../components/Footer/footer';

class Index1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navClass: "navbar-white"
        };
    }

    render() {
        return (
            <React.Fragment>

                {/* Importing Navbar */}
                <NavbarPage navClass={this.state.navClass} />

                {/* Importing Section */}
                <Section />

                {/* Importing Client */}
                <Tools />

                {/* Importing Services */}
                <Services />

                {/* Importing Website Description */}
                <WebsiteDescription />

                {/* Importing Projects */}
                <Projects />

                {/* Importing Contact Us */}
                <Contact />

                {/* Importing Get Footer */}
                <Footer />

            </React.Fragment>
        );
    }
}

export default Index1;