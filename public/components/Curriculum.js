import React from "react"
import { Tabs, Tab, Well, Row, Col } from "react-bootstrap"
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
    function renderCurriculumPoints(category) {
        const curriculumPoints = category.values
        let key = -1
        return _.map(curriculumPoints, curriculum => {
            key++
            return (
                <Col md={6} key={`Col${key}`}>
                    <Well id={`{"categoryKey": "${category.key}", "curriculumKey": "${key}", "selected": ${curriculum.selected}}`}
                          className={`curriculum-select ${curriculum.selected ? "curriculum-select-selected" : ""}`}
                          onClick={toggleSelected} >
                          {curriculum.displayName}
                    </Well>
                </Col>
            )
        })
    }

    function renderTabs() {
        return _.map(tabCategories, category => {
            return (
                <Tab eventKey={category.displayName} key={category.displayName} title={category.displayName}><Row>{renderCurriculumPoints(category)}</Row></Tab>
            )
        })
    }
    return (
        <Tabs id="curriculumTabs">
            {renderTabs()}
        </Tabs>
    )
}
