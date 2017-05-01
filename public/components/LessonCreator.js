import React from "react"
import { Grid, Row, Col, FormControl, FormGroup, Button, Checkbox, ControlLabel, Well } from "react-bootstrap"
import _ from "lodash"

class LessonCreator extends React.Component {
    constructor({ upload, backgroundColor }) {
        super();
        // TODO grade level is getting stuff added to it automattically
        this.state = {
            files: [],
            lessonName: "",
            lessonSource: "",
            lessonType: [],
            lessonCurriculum: [],
            gradeLevel: []
        }

        this.prepareForUpload = this.prepareForUpload.bind(this)
        this.filePicked = this.filePicked.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.dropUpload = this.dropUpload.bind(this)
        this.viewFiles = this.viewFiles.bind(this)
        this.lessonCurriculumCheckboxes = this.lessonCurriculumCheckboxes.bind(this)
        this.lessonTypeCheckboxes = this.lessonTypeCheckboxes.bind(this)
        this.gradeLevelCheckboxes = this.gradeLevelCheckboxes.bind(this)
        this.renderCheckboxes = this.renderCheckboxes.bind(this)
    }

    prepareForUpload() {
        const checkboxValues = (checkboxes) => {
            console.log(checkboxes)
            let uploadValues = []
            for (let checkbox of checkboxes) {
                if (checkbox.checked) {
                    uploadValues.push(checkbox.labels[0].innerText)
                }
            }
            return uploadValues
        }
        let uploadLessonType = checkboxValues(this.state.lessonType)
        let uploadLessonCurriculum = checkboxValues(this.state.lessonCurriculum)
        let uploadGradeLevel = checkboxValues(this.state.gradeLevel)

        const uploadObject = {
          lessonName: this.state.lessonName,
          lessonSource: this.state.lessonSource,
          files: this.state.files,
          type: uploadLessonType,
          curriculum: uploadLessonCurriculum,
          grade: uploadGradeLevel
        }

        //this.props.upload(uploadObject)
    }

    filePicked(file) {
      let newFiles = this.state.files
      newFiles.push(file)
      this.setState({files: newFiles}, () => {
        console.log(this.state.files)
      })
    }

    handleChange(stateVariable, {target}) {
        let change = {}
        change[stateVariable] = target.value
        this.setState(change)
    }

    dropUpload(event) {
        event.preventDefault()

        var dataTransfer = event.dataTransfer;

        if (dataTransfer.items) {
          // Use DataTransferItemList interface to access the file(s)
          for (let i=0; i < dataTransfer.items.length; i++) {
            if (dataTransfer.items[i].kind == "file") {
              var droppedFile = dataTransfer.items[i].getAsFile();
              console.log("file[" + i + "].name = " + droppedFile.name);
              filePicked(droppedFile)
            }
          }
        }
    }

    lessonTypeCheckboxes(checkbox) {
        let checkboxes = this.state.lessonType
        checkboxes.push(checkbox)
        this.setState({lessonType: checkboxes})
    }

    lessonCurriculumCheckboxes(checkbox) {
        let checkboxes = this.state.lessonCurriculum
        checkboxes.push(checkbox)
        this.setState({lessonCurriculum: checkboxes})
    }

     gradeLevelCheckboxes(checkbox) {
         console.log(checkbox)
         console.log(this.state.gradeLevel)
         let checkboxes = this.state.gradeLevel
         checkboxes.push(checkbox)
         this.setState({gradeLevel: checkboxes})
     }

    viewFiles() {
        return (
          <div>{this.state.files.length}</div>
        )
    }

    renderCheckboxes(items, columnSize, keys) {
        let counter = -1
        return _.map(items, item => {
            counter++
            return (
                <Col md={columnSize} key={`checkbox: ${keys[counter]}`} >
                <Checkbox inline inputRef={this.gradeLevelCheckboxes}>
                  {item}
                </Checkbox>
                </Col>
            )
        })
    }

    render(){
        return  (
          <Grid>
              <FormGroup bsSize="large" controlId="upload">
                  <Row className="form-margin">
                      <Col md={12}>
                          <h2>Create a Lesson:</h2>
                      </Col>
                  </Row>
                  <Row className="form-margin">
                      <Col md={12}>
                          <ControlLabel>Name</ControlLabel>
                          <FormControl type="text" placeholder="Name" onChange={this.handleChange.bind(this, "lessonName")}/>
                      </Col>
                  </Row>
                  <Row className="form-margin">
                      <Col md={12}>
                          <ControlLabel>Source</ControlLabel>
                          <FormControl type="text" placeholder="Source" onChange={this.handleChange.bind(this, "lessonSource")}/>
                      </Col>
                  </Row>
                  <ControlLabel>Resources: Drag & Drop files</ControlLabel>
                  <Well onDragOver={(event) => event.preventDefault()} onDrop={this.dropUpload} >{this.viewFiles()}</Well>
                  <Well className={this.props.backgroundColor} >
                  <ControlLabel className="form-margin">Lesson Type</ControlLabel>
                  <Row>
                      {this.renderCheckboxes(["Vocal", "Instrumental", "Movement", "Listening"], 3, ["Vocal", "Instrumental", "Movement", "Listening"])}
                  </Row>
                  </Well>
                  <div className="form-margin"></div>
                  <Well className={this.props.backgroundColor} >
                  <ControlLabel className="form-margin">Grade Level</ControlLabel>
                  <Row>
                      {this.renderCheckboxes(["Kindergarten", <div>1<sup>st</sup> Grade</div>, <div>2<sup>nd</sup> Grade</div>], 4, ["K", "1st", "2nd"])}
                  </Row>
                  <div className="form-margin"></div>
                  <Row>
                    {this.renderCheckboxes([<div>3<sup>rd</sup></div>, <div>4<sup>th</sup> Grade</div>, <div>5<sup>th</sup> Grade</div>], 4, ["3rd", "4th", "5th"])}
                  </Row>
                  </Well>
                  <Row className="form-margin">
                      <Col md={12}>
                          <Button bsStyle="info" bsSize="large" block>Curriculum</Button>
                      </Col>
                  </Row>
              </FormGroup>
              <div className="separatingMargin"></div>
              <hr/>
              <Row className="separatingMargin">
                <Col md={12}>
                  <Button bsStyle="primary" bsSize="large" onClick={this.prepareForUpload} block>Upload</Button>
                </Col>
              </Row>
              <hr/>
          </Grid>
        )
    }
}

export default LessonCreator
