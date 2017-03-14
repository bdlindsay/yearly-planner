import React from "react"
import styles from "../styles/styles.css"
import NavBar from "../components/navBar"
import { Button, Modal } from "react-bootstrap"
import Firebase from "../firebase/firebase"
import LessonTable from "../components/LessonTable"
import LessonCreator from "../components/LessonCreator"

class LessonView extends React.Component {
    constructor(props) {
        super()

        this.state = {
          currentMonth: "January",
          grade: props.params.grade,
          shouldShowCreateView: false,
          lessons: []
        }
        this.firebase = new Firebase()

        switch(this.state.grade) {
          case "Kindergarten":
            this.backgroundColor = "light-yellow"
            break
          case "1stGrade":
            this.backgroundColor = "light-green"
            break
          case "2ndGrade":
            this.backgroundColor = "light-orange"
            break
          case "3rdGrade":
            this.backgroundColor = "light-red"
            break
          case "4thGrade":
            this.backgroundColor = "light-purple"
            break
          case "5thGrade":
            this.backgroundColor = "light-blue"
            break
        }

        this.changeMonth = this.changeMonth.bind(this)
        this.currentView = this.currentView.bind(this)
        this.toggleCreate = this.toggleCreate.bind(this)
        this.uploadToFirebase = this.uploadToFirebase.bind(this)
        this.buttonText = this.buttonText.bind(this)
    }
    
    componentWillMount() {
        this.firebase.downloadLessons().then( lessons => {
            console.log(lessons.val())
            this.setState({lessons: lessons.val()})
        })
    }

    uploadToFirebase(uploadObject) {
        for (const file of uploadObject.files) {
            console.log("Uploading" + JSON.stringify(file))
            //this.firebase.upload(file)
        }

        console.log("Uploading" + JSON.stringify(uploadObject))
        this.firebase.upload(uploadObject) // TODO callback for when it has successfully uploaded?
    }

    currentView() {
        return this.state.shouldShowCreateView ? <LessonCreator upload={this.uploadToFirebase} backgroundColor={this.backgroundColor} /> : <LessonTable lessons={this.state.lessons} />
    }

    toggleCreate() {
        this.state.shouldShowCreateView ? this.setState({shouldShowCreateView: false}) : this.setState({shouldShowCreateView: true})
    }

    buttonText() {
        return this.state.shouldShowCreateView ? "Cancel" : "Add a Lesson"
    }

    render() {
        return (
          <div>
            <div className="row">
              <NavBar showMonths={!this.state.shouldShowCreateView} changeMonth={this.changeMonth} currentMonth={this.state.currentMonth} />
            </div>
            <div className="nav-top-margin row grade-btn-padding">
              <Button bsClass="add btn" bsSize="lg" onClick={this.toggleCreate} >{this.buttonText()}</Button>
            </div>
            <div className={`${this.backgroundColor} row`}>
              {this.currentView()}
            </div>
          </div>
        )
    }

  changeMonth(eventKey) {
    console.log(eventKey)
    switch (eventKey) {
      case 1.1:
        this.setState({currentMonth: "January"})
        break
      case 1.2:
        this.setState({currentMonth: "February"})
        break
      case 1.3:
        this.setState({currentMonth: "March"})
        break
      case 1.4:
        this.setState({currentMonth: "April"})
        break
      case 1.5:
        this.setState({currentMonth: "May"})
        break
      case 1.6:
        this.setState({currentMonth: "June"})
        break
      case 1.7:
        this.setState({currentMonth: "July"})
        break
      case 1.8:
        this.setState({currentMonth: "August"})
        break
      case 1.9:
        this.setState({currentMonth: "September"})
        break
      case 1.10:
        this.setState({currentMonth: "October"})
        break
      case 1.11:
        this.setState({currentMonth: "November"})
        break
      case 1.12:
        this.setState({currentMonth: "December"})
        break
      default: break
    }
  }
}

export default LessonView
