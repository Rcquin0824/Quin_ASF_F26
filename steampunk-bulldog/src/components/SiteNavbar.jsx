import {useState} from "react";
import{
    Collapse,Container,Nav,Navbar,NavbarBrand, NavbarToggler, NavItem,
} from "reactstrap";
import {NavLink} from "react-router-dom";

export default function SiteNavbar(){
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        ['Home', '/'],
        ['About', '/about'],
        ['Menu', '/menu'],
        ['Reservations', '/reservations'],
        ['Cart', '/cart'],
    ];

    return (
        <Navbar dark color="dark" expand="lg">
            <Container className={"navbar-layout"}>
                <NavbarBrand tag={NavLink} to="/">
                    Steampunk Bulldog
                </NavbarBrand>

                <NavbarToggler
                    onClick={() => setIsOpen((open) => !open)}
                    aria-label="Toggle navigation"/>

                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ms-auto" navbar>
                        {links.map(([label, path]) =>(
                            <NavItem key={path}>
                                <NavLink
                                    to={path}
                                    end={path ==='/'}
                                    className={({ isActive}) =>
                                `nav-link${isActive ? 'active': ''}`
                                }
                                    onClick = {() => setIsOpen(false)}>
                                    {label}
                                </NavLink>
                            </NavItem>
                        ))}

                    </Nav>
                </Collapse>
                <img src="/Logo.png" alt="Steampunk Bulldog logo"  className="navbar-logo ms-1"/>
            </Container>
        </Navbar>
    );
};

