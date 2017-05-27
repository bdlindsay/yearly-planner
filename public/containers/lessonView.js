import React from "react"
import styles from "../styles/styles.css"
import NavBar from "../components/navBar"
import { Button, Modal, Row, Col } from "react-bootstrap"
import Firebase from "../firebase/firebase"
import LessonTable from "../components/LessonTable"
import LessonCreator from "../components/LessonCreator"
import Login from "../components/Login"
import _ from "lodash"

class LessonView extends React.Component {
    constructor(props) {
        super()

        const listener = (user) => {
          if (user) {
            console.log("Signed-in!")
            //console.log(user)
            this.isSignedIn = true
            this.setState({isSignedIn: true})
          } else {
            console.log("Signed-out :(")
            this.isSignedIn = false
            this.setState({isSignedIn: false, shouldShowCreateView: false})
          }
        }

        this.firebase = new Firebase()
        this.firebase.setAuthenticationListener(listener)

        let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        this.state = {
          currentMonth: monthNames[(new Date()).getMonth()],
          grade: props.params.grade,
          shouldShowCreateView: false,
          lessons: [],
          isSignedIn: this.isSignedIn,
          email: "",
          password: "",
          hasFailedSignIn: false,
          searchText: ""
        }

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
        // TODO redirects?
        this.signInWithEmailAndPassword = this.signInWithEmailAndPassword.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.filteredLessons = this.filteredLessons.bind(this)
    }

    componentWillMount() {
        this.firebase.downloadLessons().then( lessons => {
            console.log(lessons.val())
            this.setState({lessons: lessons.val()})
        })
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

    uploadToFirebase(uploadObject) {
        console.log("Uploading" + JSON.stringify(uploadObject))
        // TODO callback for when it has successfully uploaded?
        this.firebase.upload(uploadObject, callback).then(response => {
            console.log(response)
            console.log("Successfully uploaded lesson.")
            this.setState({shouldShowCreateView: false})
        }).catch( error => {
            console.log(error)
        })
        this.setState({shouldShowCreateView: false}) // TODO remove when callback from db works?
    }

    filteredLessons(lessons) {
        const lessonsByGrade = _.filter(this.state.lessons, lesson => lesson.grade.includes(this.state.grade) && lesson.months.includes(this.state.currentMonth))
        if (_.trim(this.state.searchText) == "") { return lessonsByGrade }

        return _.filter(lessonsByGrade, lesson => {
            const matchWords = _.words(_.reduce(lesson.curriculum, (curriculumString, curriculumPoint) => {
                return `${curriculumString} ${curriculumPoint.selectedValues ? curriculumPoint.selectedValues : ""}`
            }, `${lesson.lessonName} ${lesson.type}`).toLowerCase())

            const searchTextWords = _.words(this.state.searchText.toLowerCase())

            // TODO which is preferred? matchWord.includes(searchTextWord) or
            let matches = _.filter(matchWords, matchWord => {
                return _.find(searchTextWords, searchTextWord => _.startsWith(matchWord, searchTextWord)) !== undefined
            })

            console.log(matches)

            return matches.length > 0
        })
    }

    currentView() {
        if (this.state.shouldShowCreateView){
            return <LessonCreator upload={this.uploadToFirebase} backgroundColor={this.backgroundColor} />
        } else {
            return (
                <LessonTable
                    lessons={this.filteredLessons()}
                    grade={this.state.grade}
                    searchText={this.state.searchText}
                    handleChange={this.handleChange}
                    iconColor={this.backgroundColor}
                 />
            )
        }
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
              <NavBar showMonths={!this.state.shouldShowCreateView}
                  changeMonth={this.changeMonth}
                  currentMonth={this.state.currentMonth}
                  addLessonToggle={this.toggleCreate}
                  addLessonText={this.buttonText()}
                  isSignedIn={this.state.isSignedIn}
                  signOut={_.get(this, "firebase.signOut", (() => {})) }
              />
            </div>
            <Row className={`${this.state.shouldShowCreateView ? "" : this.backgroundColor} nav-top-margin grade-btn-padding`}>
                {this.state.isSignedIn ? this.currentView() : <Login handleChange={this.handleChange} attemptSignIn={this.signInWithEmailAndPassword} hasFailedSignIn={this.state.hasFailedSignIn} />}
            </Row>
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
      case 1.11:
        this.setState({currentMonth: "October"})
        break
      case 1.12:
        this.setState({currentMonth: "November"})
        break
      case 1.13:
        this.setState({currentMonth: "December"})
        break
      default: break
    }
  }
}

export default LessonView
