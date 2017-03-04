import React from "react"
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Grid, Row, Col } from "react-bootstrap"
import { Link } from "react-router"

const NavBar = ({showMonths, changeMonth, currentMonth}) => {
  const optionalNavDropdown = () => {
    if (showMonths) {
      return (
        <NavDropdown eventKey={1} title={`Month - ${currentMonth}`} id="monthDropdown" onSelect={changeMonth}>
          <MenuItem eventKey={1.1}>January</MenuItem>
          <MenuItem eventKey={1.2}>February</MenuItem>
          <MenuItem eventKey={1.3}>March</MenuItem>
          <MenuItem eventKey={1.4}>April</MenuItem>
          <MenuItem eventKey={1.5}>May</MenuItem>
          <MenuItem eventKey={1.6}>June</MenuItem>
          <MenuItem eventKey={1.7}>July</MenuItem>
          <MenuItem eventKey={1.8}>August</MenuItem>
          <MenuItem eventKey={1.9}>September</MenuItem>
          <MenuItem eventKey={1.10}>October</MenuItem>
          <MenuItem eventKey={1.11}>November</MenuItem>
          <MenuItem eventKey={1.12}>December</MenuItem>
        </NavDropdown>
      )
    }
  }
  return (
    <Navbar inverse fixedTop fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Yearly Planner</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
        <Nav>
          {optionalNavDropdown()}
        </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
