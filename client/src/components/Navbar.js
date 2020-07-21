import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

export default function Nabar() {
  return (
    <Navbar
      bg="light"
      variant="light"
      className="sticky-top py-2 px-0 px-md-3 px-lg-4 px-xl-5"
    >
      <Link to="/" className="navbar-brand">
        Client Management System
      </Link>
      <Nav className="ml-auto">
        <li className="nav-item">
          <Link className="nav-link text-danger" to="/">
            Logout
          </Link>
        </li>
      </Nav>
    </Navbar>
  );
}
