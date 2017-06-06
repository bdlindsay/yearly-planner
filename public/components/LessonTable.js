import React from "react"
import { Link } from "react-router"
import { Table, Popover, OverlayTrigger, Col, Row, InputGroup, FormControl, Glyphicon, Image, Button } from "react-bootstrap"
import _ from "lodash"
import style from "../styles/styles.css"

const LessonTable = ({lessons, grade, searchText, handleChange, handleToggle, iconColor, shouldShowDetails, tableRowSelected, selectedLesson}) => {
  const lessonRows = () => {
      const reduceLessonTypes = (lesson, index) => {
          return _.reduce(lesson.type, (types, type) => {
              index++
              let isLastLessonType = index === lesson.type.length
              return isLastLessonType ? types + `${type}` : types + `${type}, `
          }, "")
      }

      const downloadResourceLinks = (lesson) => {
          let count = -1
            return _.map(lesson.files, file => {
                count++
                return <Row key={`${count}-${file.name}`}><Col md={12}><a href={file.url} download={file.name} className="download-link">{file.name}</a></Col></Row>
            })
      }

      return _.map(lessons, lesson => {
          let index = 0
          return (
              <tr onClick={tableRowSelected.bind(this, lesson)} key={lesson.lessonName} >
                <td>{lesson.lessonName}</td>
                <td>{reduceLessonTypes(lesson, index)}</td>
                <td>{downloadResourceLinks(lesson)}</td>
              </tr>

          )
      })
  }

  const renderLessonDetails = () => {
      const displayCurriculum = (curriculum) => {
          const formattedCurriculum = curriculum.map( curriculumPoint => {
              if (curriculumPoint.selectedValues === undefined) { return undefined }
              return `${curriculumPoint.category}: ${curriculumPoint.selectedValues.join()}`
          })

          return _.without(formattedCurriculum, undefined).join("\n")
      }

      const displayValues = [
          `Name: ${selectedLesson.lessonName}`,
          `Source: ${selectedLesson.lessonSource}`,
          `Type: ${selectedLesson.type.join(", ")}`,
          `Grade Level: ${selectedLesson.grade.join(", ")}`,
          `For Months: ${selectedLesson.months.join(", ")}`,
          `Curriculum: ${displayCurriculum(selectedLesson.curriculum)}`,
      ]

      return (
          <div>
              <Col md={12}>
                  <Button onClick={handleToggle.bind(this, "shouldShowDetails")} >Back</Button>
              </Col>
              {displayValues.map( displayValue => <Col md={12}>{displayValue}</Col> )}

          </div>
      )
  }

  const renderLessonTable = () => {
      return (
          <div>
              <Col md={12} className="form-margin">
                  <InputGroup>
                      <InputGroup.Addon className={iconColor}>
                          <Glyphicon glyph="search" />
                      </InputGroup.Addon>
                      <FormControl
                          type="text"
                          value={searchText}
                          placeholder="Search"
                          onChange={handleChange.bind(this, "searchText")}
                          />
                  </InputGroup>
              </Col>
              <Col md={12}>
                  <Table striped bordered hover>
                      <thead>
                          <tr>
                              <th>Lesson Name</th>
                              <th>Type</th>
                              <th>Resources</th>
                          </tr>
                      </thead>
                      <tbody>
                          {lessonRows()}
                      </tbody>
                  </Table>
              </Col>
          </div>
      )
  }

  return (
    <Row>
        <Col md={12}>
            <h3>{_.replace(grade, "Grade", " Grade")}</h3>
        </Col>
        {shouldShowDetails ? renderLessonDetails() : renderLessonTable()}
    </Row>
  )
}

export default LessonTable
