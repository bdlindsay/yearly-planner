import React from "react"
import styles from "../styles/styles.css"
import NavBar from "../components/navBar"
import { Table, FormControl, FormGroup, Button } from "react-bootstrap"
import Firebase from "../firebase/firebase"

class LessonView extends React.Component {
  constructor(props) {
    super()

    this.state = {
      currentMonth: "January",
      grade: props.params.grade,
      file: null
    }
    this.firebase = new Firebase()

    this.changeMonth = this.changeMonth.bind(this)
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
    this.upload = this.upload.bind(this)
  }

  upload() {
    this.firebase.upload(this.state.file)
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

  render() {
    return (
      <div>
        <div className="row">
          <NavBar showMonths={true} changeMonth={this.changeMonth} currentMonth={this.state.currentMonth} />
        </div>
        <div className={`${this.backgroundColor} nav-top-margin row`}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Test Header</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Test data</td>
                <td>
                  <FormGroup bsSize="large" controlId="upload">
                    <FormControl type="file" onChange={({target}) => { this.state.file = target.files}}/>
                  </FormGroup>
                </td>
                <td><Button onClick={this.upload}>Upload</Button></td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    )
  }
}

export default LessonView
