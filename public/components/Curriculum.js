import React from "react"
import { Tabs, Tab, Well } from "react-bootstrap"
import _ from "lodash"

/*
tabCategories: {
    form: ,
    rhythm: [],
    timbre: [],
    pitch: [],
    musicianship: [],
    dynamicsAndTempo: []
}
*/
export default ({ tabCategories, toggleSelected, color }) => {
    function renderCurriculumPoints(curriculumPoints) {
        let key = -1
        return _.map(curriculumPoints, curriculum => {
            key++
            // TODO add category and curriculumPoint to selected method and only change 1 at a time
            return <Well key={key} style={{backgroundColor: color}} onClick={toggleSelected} >{curriculum.displayName}</Well>
        })
    }

    function renderTabs() {
        return _.map(tabCategories, category => {
            return (
                <Tab eventKey={category.displayName} key={category.displayName} title={category.displayName} >{renderCurriculumPoints(category.values)}</Tab>
            )
        })
    }
    return (
        <Tabs id="curriculumTabs">
            {renderTabs()}
        </Tabs>
    )
}
/*
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
*/
