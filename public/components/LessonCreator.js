import React from "react"
import { Grid, Row, Col, FormControl, FormGroup, Button, Checkbox, ControlLabel } from "react-bootstrap"

const LessonCreator = ({ upload, file, filePicked }) => {
  return (
    <Grid>
      <FormGroup bsSize="large" controlId="upload">
      <Row>
        <Col md={12}>
        <ControlLabel>Lesson Name</ControlLabel>
        <FormControl type="text" placeholder="Enter the lesson name" />
        </Col>
      </Row>
      <Row>
        <ControlLabel>Lesson Resources</ControlLabel>
        <FormControl type="file" onChange={({target}) => { filePicked(target.files)}}/>
      </Row>
      <Row>
        <Checkbox inline>
          Singing
        </Checkbox>
        <Checkbox inline>
          Instrumental
        </Checkbox>
        <Checkbox inline>
          Movement
        </Checkbox>
      </Row>
      </FormGroup>
      <Button bsStyle="primary" onClick={upload}>Upload</Button>
    </Grid>
  )
}

export default LessonCreator
