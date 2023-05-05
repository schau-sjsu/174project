import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const Navigation = () => {
    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Organizer</NavbarBrand>
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink href="/calendar/">Calendar</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/">Todo List</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    );
}

export default Navigation;
