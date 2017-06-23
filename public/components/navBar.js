import React from "react"
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Grid, Row, Col } from "react-bootstrap"
import { Link } from "react-router"

const NavBar = ({showMonths, changeMonth, currentMonth, addLessonToggle, addLessonText, isSignedIn, signOut}) => {
    const optionalNavDropdown = () => {
        if (showMonths) {
            return (
                <NavDropdown eventKey={1} title={`Month - ${currentMonth}`} id="monthDropdown" onSelect={changeMonth}>
                    <MenuItem eventKey={"All"} >All</MenuItem>
                    <MenuItem eventKey={"January"}>January</MenuItem>
                    <MenuItem eventKey={"February"}>February</MenuItem>
                    <MenuItem eventKey={"March"}>March</MenuItem>
                    <MenuItem eventKey={"April"}>April</MenuItem>
                    <MenuItem eventKey={"May"}>May</MenuItem>
                    <MenuItem eventKey={"June"}>June</MenuItem>
                    <MenuItem eventKey={"July"}>July</MenuItem>
                    <MenuItem eventKey={"August"}>August</MenuItem>
                    <MenuItem eventKey={"September"}>September</MenuItem>
                    <MenuItem eventKey={"October"}>October</MenuItem>
                    <MenuItem eventKey={"November"}>November</MenuItem>
                    <MenuItem eventKey={"December"}>December</MenuItem>
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
                <Nav pullRight>
                    <NavItem eventKey={2} onClick={addLessonToggle}  disabled={!isSignedIn}>{addLessonText}</NavItem>
                    <NavItem eventKey={3} onClick={signOut} disabled={!isSignedIn}>Sign Out</NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar
