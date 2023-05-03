import React, { useState } from "react";
import { Link, Navigate, NavLink as RRNavLink, useNavigate } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
} from "reactstrap";
import { logout } from "../modules/authManager";

export default function Header({ isLoggedIn }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const navigate = useNavigate();

    return (
        <div>
            <Navbar color="dark" dark expand="md">
                <Link to="/" className="navbar-brand">
                    Tasker
                </Link>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="navbar navbar-expand navbar-dark" navbar>
                        {isLoggedIn && (
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/project">
                                        My Projects
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/project/new">
                                        New Project
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <a
                                        aria-current="page"
                                        className="nav-link"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            logout();
                                            navigate("/login");
                                        }}
                                    >
                                        Logout
                                    </a>
                                </NavItem>
                            </>
                        )}
                        {!isLoggedIn && (
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">
                                        Login
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/register">
                                        Register
                                    </NavLink>
                                </NavItem>
                            </>
                        )}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};