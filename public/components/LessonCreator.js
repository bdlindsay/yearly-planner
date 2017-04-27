import React from "react"
import { Grid, Row, Col, FormControl, FormGroup, Button, Checkbox, ControlLabel, Well } from "react-bootstrap"

class LessonCreator extends React.Component {
    constructor({ upload, backgroundColor }) {
        super();

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
    }

    prepareForUpload() {
        const checkboxValues = (checkboxes) => {
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

        this.props.upload(uploadObject)
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
         let checkboxes = this.state.gradeLevel
         checkboxes.push(checkbox)
         this.setState({gradeLevel: checkboxes})
     }

    viewFiles() {
        return (
          <div>{this.state.files.length}</div>
        )
    }
    // TODO source of lesson materials grades
    render(){
        return  (
          <Grid>
              <FormGroup bsSize="large" controlId="upload">
                  <Row className="form-margin">
                      <Col md={12}>
                          <ControlLabel>Lesson Name</ControlLabel>
                          <FormControl type="text" placeholder="Name" onChange={this.handleChange.bind(this, "lessonName")}/>
                      </Col>
                  </Row>
                  <Row className="form-margin">
                      <Col md={12}>
                          <ControlLabel>Lesson Source</ControlLabel>
                          <FormControl type="text" placeholder="Source" onChange={this.handleChange.bind(this, "lessonSource")}/>
                      </Col>
                  </Row>
                  <Row className="form-margin">
                    <Col md={12}>
                    <ControlLabel>Lesson Resources</ControlLabel>
                    <FormControl type="file" onChange={({target}) => { filePicked(target.files)}}/>
                    </Col>
                  </Row>
                  <ControlLabel> Drag & Drop files</ControlLabel>
                  <Well onDragOver={(event) => event.preventDefault()} onDrop={this.dropUpload} >{this.viewFiles()}</Well>
                  <Well className={this.props.backgroundColor} >
                  <ControlLabel className="form-margin">Lesson Type</ControlLabel>
                  <Row>
                    <Col md={4} >
                    <Checkbox inline inputRef={this.lessonTypeCheckboxes}>
                      Singing
                    </Checkbox>
                    </Col>
                    <Col md={4} >
                    <Checkbox inline inputRef={this.lessonTypeCheckboxes}>
                      Instrumental
                    </Checkbox>
                    </Col>
                    <Col md={4} >
                    <Checkbox inline inputRef={this.lessonTypeCheckboxes}>
                      Movement
                    </Checkbox>
                    </Col>
                  </Row>
                  </Well>
                  <div className="form-margin"></div>
                  <Well className={this.props.backgroundColor} >
                  <ControlLabel className="form-margin">Curriculum Covered</ControlLabel>
                  <Row>
                    <Col md={4} >
                    <Checkbox inline inputRef={this.lessonCurriculumCheckboxes}>
                      Keep a Steady Beat
                    </Checkbox>
                    </Col>
                    <Col md={4} >
                    <Checkbox inline inputRef={this.lessonCurriculumCheckboxes}>
                      Knowing Sol-Mi
                    </Checkbox>
                    </Col>
                    <Col md={4} >
                    <Checkbox inline inputRef={this.lessonCurriculumCheckboxes}>
                      Recorder Basics
                    </Checkbox>
                    </Col>
                  </Row>
                  </Well>
                  <div className="form-margin"></div>
                  <Well className={this.props.backgroundColor} >
                  <ControlLabel className="form-margin">Grade Level</ControlLabel>
                  <Row>
                    <Col md={4} >
                    <Checkbox inline inputRef={this.gradeLevelCheckboxes}>
                      Kindergarten
                    </Checkbox>
                    </Col>
                    <Col md={4} >
                    <Checkbox inline inputRef={this.gradeLevelCheckboxes}>
                      1<sup>st</sup> Grade
                    </Checkbox>
                    </Col>
                    <Col md={4} >
                    <Checkbox inline inputRef={this.gradeLevelCheckboxes}>
                      2<sup>nd</sup> Grade
                    </Checkbox>
                    </Col>
                  </Row>
                  <div className="form-margin"></div>
                  <Row>
                    <Col md={4} >
                    <Checkbox inline inputRef={this.gradeLevelCheckboxes}>
                      3<sup>rd</sup> Grade
                    </Checkbox>
                    </Col>
                    <Col md={4} >
                    <Checkbox inline inputRef={this.gradeLevelCheckboxes}>
                      4<sup>th</sup> Grade
                    </Checkbox>
                    </Col>
                    <Col md={4} >
                    <Checkbox inline inputRef={this.gradeLevelCheckboxes}>
                      5<sup>th</sup> Grade
                    </Checkbox>
                    </Col>
                  </Row>
                  </Well>
              </FormGroup>
              <Row className="form-margin">
                <Col mdOffset={11}>
                  <Button bsStyle="primary" onClick={this.prepareForUpload}>Upload</Button>
                </Col>
              </Row>
          </Grid>
        )
    }
}

export default LessonCreator
