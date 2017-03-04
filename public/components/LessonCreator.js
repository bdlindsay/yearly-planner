import React from "react"
import { Grid, Row, Col, FormControl, FormGroup, Button, Checkbox, ControlLabel, Well } from "react-bootstrap"

const LessonCreator = ({ upload, files, handleChange, filePicked, backgroundColor }) => {
  const dropUpload = (event) => {
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
  const viewFiles = () => {
    return (
      <div>{files.length}</div>
    )
  }

  return (
    <Grid>
      <FormGroup bsSize="large" controlId="upload">
      <Row className="form-margin">
        <Col md={12}>
        <ControlLabel draggable={true}>Lesson Name</ControlLabel>
        <FormControl type="text" placeholder="Enter the lesson name" onChange={handleChange}/>
        </Col>
      </Row>
      <Row className="form-margin">
        <Col md={12}>
        <ControlLabel>Lesson Resources</ControlLabel>
        <FormControl type="file" onChange={({target}) => { filePicked(target.files)}}/>
        </Col>
      </Row>
      <ControlLabel>or Drag & Drop files</ControlLabel>
      <Well onDragOver={(event) => event.preventDefault()} onDrop={dropUpload} >{viewFiles()}</Well>
      <Well className={backgroundColor} >
      <ControlLabel className="form-margin">Lesson Type</ControlLabel>
      <Row>
        <Col md={4} >
        <Checkbox inline>
          Singing
        </Checkbox>
        </Col>
        <Col md={4} >
        <Checkbox inline>
          Instrumental
        </Checkbox>
        </Col>
        <Col md={4} >
        <Checkbox inline>
          Movement
        </Checkbox>
        </Col>
      </Row>
      </Well>
      <div className="form-margin"></div>
      <Well className={backgroundColor} >
      <ControlLabel className="form-margin">Curriculum Covered</ControlLabel>
      <Row>
        <Col md={4} >
        <Checkbox inline>
          Keep a Steady Beat
        </Checkbox>
        </Col>
        <Col md={4} >
        <Checkbox inline>
          Knowing Sol-Mi
        </Checkbox>
        </Col>
        <Col md={4} >
        <Checkbox inline>
          Recorder Basics
        </Checkbox>
        </Col>
      </Row>
      </Well>
      </FormGroup>
      <Row className="form-margin">
        <Col mdOffset={11}>
          <Button bsStyle="primary" onClick={upload}>Upload</Button>
        </Col>
      </Row>
    </Grid>
  )
}

export default LessonCreator
