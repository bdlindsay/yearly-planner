import React from "react"
import { Navbar, Nav, NavItem, Table, Button, Col, Row } from "react-bootstrap"
import styles from "../styles/styles.css"
import { Link } from "react-router"
import NavBar from "../components/navBar"
import Firebase from "../firebase/firebase"
import LessonCreator from "../components/LessonCreator"
import Login from "../components/Login"

class Home extends React.Component {
  constructor({ gradeSelect }) {
    super();

    const listener = (user) => {
      if (user) {
        console.log("Signed-in!")
        //console.log(user)
        this.isSignedIn = true
        this.setState({isSignedIn: true})
      } else {
        console.log("Signed-out :(")
        this.isSignedIn = false
        this.setState({isSignedIn: false, hasFailedSignIn: false})
      }
    }

    this.firebase = new Firebase()
    this.firebase.setAuthenticationListener(listener)

    this.state = {
      gradeSelect: gradeSelect,
      shouldShowCreateView: false,
      isSignedIn: this.isSignedIn,
      email: "",
      password: "",
      hasFailedSignIn: false
    }

    this.buttonText = this.buttonText.bind(this)
    this.currentView = this.currentView.bind(this)
    this.gradeButtons = this.gradeButtons.bind(this)
    this.uploadToFirebase = this.uploadToFirebase.bind(this)
    this.toggleCreate = this.toggleCreate.bind(this)
    // TODO redirects?
    this.signInWithEmailAndPassword = this.signInWithEmailAndPassword.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(stateVariable, {target}) {
      let change = {}
      change[stateVariable] = target.value
      this.setState(change)
  }

  signInWithEmailAndPassword() {
      this.firebase.authenticate(this.state.email, this.state.password).then( response => {
          console.log(`${email} was successfully signed-in`)
          this.setState({isSignedIn: true, password: "" })
      }).catch(error => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(`Login Error: ${errorCode}: ${errorMessage}`)
        this.setState({ hasFailedSignIn: true, password: "" })
      })
  }
  // Create view Package
  uploadToFirebase(uploadObject) {
      for (const file of uploadObject.files) {
          console.log("Uploading" + JSON.stringify(file))
          //this.firebase.upload(file)
      }

      console.log("Uploading" + JSON.stringify(uploadObject))
      this.firebase.upload(uploadObject) // TODO callback for when it has successfully uploaded?
  }

  buttonText() {
      return this.state.shouldShowCreateView ? "Cancel" : "Add a Lesson"
  }

  currentView() {
      return (
          <div className="nav-top-margin row grade-btn-padding">
              <Col sm={2}>
                  <Button onClick={this.firebase.signOut} bsSize="lg" >Sign Out</Button>
              </Col>
              <Col sm={2} smOffset={8} >
                  <Button bsClass="add btn" bsSize="lg" onClick={this.toggleCreate} >{this.buttonText()}</Button>
              </Col>
              { this.state.shouldShowCreateView ? <LessonCreator upload={this.uploadToFirebase} backgroundColor="white" /> : this.gradeButtons() }
          </div>
      )
  }

  toggleCreate() {
      this.state.shouldShowCreateView ? this.setState({shouldShowCreateView: false}) : this.setState({shouldShowCreateView: true})
  }
  // End create view package

  render() {
    return (
      <div>
        <div className="row">
          <NavBar showMonths={false} />
        </div>
            {this.state.isSignedIn ? this.currentView() : <Login handleChange={this.handleChange} attemptSignIn={this.signInWithEmailAndPassword} hasFailedSignIn={this.state.hasFailedSignIn} />}
      </div>
    )
  }

  gradeButtons() {
      return (
          <div className="row">
            <div className="row">
              <div className="col-md-4 grade-btn-padding">
                <center><Link to="/lessons/Kindergarten">
                  <Button
                    id={0}
                    bsClass="btn grade-btn yellow "
                    bsSize="large"
                    onClick={this.state.gradeSelect}>
                    Kindergarten
                  </Button>
                </Link></center>
              </div>
              <div className="col-md-4 grade-btn-padding">
                <center><Link to="/lessons/1stGrade">
                  <Button
                    id={1}
                    bsClass="btn grade-btn green"
                    bsSize="large"
                    onClick={this.state.gradeSelect}>
                    1<sup>st</sup> Grade
                  </Button>
                </Link></center>
              </div>
              <div className="col-md-4 grade-btn-padding">
                <center><Link to="/lessons/2ndGrade">
                  <Button
                    id={2}
                    bsClass="btn grade-btn orange"
                    bsSize="large"
                    onClick={this.state.gradeSelect}>
                    2<sup>nd</sup> Grade
                  </Button>
                </Link></center>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 grade-btn-padding">
                <center><Link to="/lessons/3rdGrade">
                  <Button
                    id={3}
                    bsClass="btn grade-btn red"
                    bsSize="large"
                    onClick={this.state.gradeSelect}>
                    3<sup>rd</sup> Grade
                  </Button>
                </Link></center>
              </div>
              <div className="col-md-4 grade-btn-padding">
                <center><Link to="/lessons/4thGrade">
                  <Button
                    id={4}
                    bsClass="btn grade-btn purple"
                    bsSize="large"
                    onClick={this.state.gradeSelect}>
                    4<sup>th</sup> Grade
                  </Button>
                </Link></center>
              </div>
              <div className="col-md-4 grade-btn-padding">
                <center><Link to="/lessons/5thGrade">
                  <Button
                    id={5}
                    bsClass="btn grade-btn blue"
                    bsSize="large"
                    onClick={this.state.gradeSelect}>
                    5<sup>th</sup> Grade
                  </Button>
                </Link></center>
              </div>
            </div>
          </div>
      )
  }
}

export default Home
