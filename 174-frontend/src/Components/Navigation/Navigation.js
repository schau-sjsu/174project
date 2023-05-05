import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Cookies from 'js-cookie';

const Navigation = () => {
    const user = Cookies.get('session');

    function handleLogout() {
        fetch('http://cos-cs106.science.sjsu.edu/~013879866/code/logout.php')
            .then(response => response.text())
            .then(data => console.log(data))
            .catch(error => console.error(error));
        Cookies.remove('session', { path: '/' });
        window.location.href = "/login";
    }

    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Organizer</NavbarBrand>
            {user && (
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href="/calendar">Calendar</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/">Todo List</NavLink>
                    </NavItem>
                    <NavItem>
                        <button onClick={handleLogout}>Logout</button>
                    </NavItem>
                </Nav>
            )}
            {!user && (
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href="/login">Login</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/register">Sign up</NavLink>
                    </NavItem>
                </Nav>
            )}
        </Navbar>
    );
}

export default Navigation;
