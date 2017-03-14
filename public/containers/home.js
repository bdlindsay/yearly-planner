import React from "react"
import { Navbar, Nav, NavItem, Table, Button } from "react-bootstrap"
import styles from "../styles/styles.css"
import { Link } from "react-router"
import NavBar from "../components/navBar"
import Firebase from "../firebase/firebase"
import LessonCreator from "../components/LessonCreator"

class Home extends React.Component {
  constructor({ gradeSelect }) {
    super();
    this.state = {
      gradeSelect: gradeSelect,
      shouldShowCreateView: false
    }

    this.firebase = new Firebase()

    this.buttonText = this.buttonText.bind(this)
    this.currentView = this.currentView.bind(this)
    this.gradeButtons = this.gradeButtons.bind(this)
    this.uploadToFirebase = this.uploadToFirebase.bind(this)
    this.toggleCreate = this.toggleCreate.bind(this)
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
      return this.state.shouldShowCreateView ? <LessonCreator upload={this.uploadToFirebase} backgroundColor="white" /> : this.gradeButtons()
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
        <div className="nav-top-margin row grade-btn-padding">
          <Button bsClass="add btn" bsSize="lg" onClick={this.toggleCreate} >{this.buttonText()}</Button>
        </div>
        {this.currentView()}
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
