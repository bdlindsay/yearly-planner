import React from "react"
import { Table, Popover, OverlayTrigger, Col, Row, InputGroup, FormControl,Glyphicon } from "react-bootstrap"
import _ from "lodash"

const LessonTable = ({lessons, grade, searchText, handleChange, iconColor}) => {
  const ciriculumPopover = () => {
    return <Popover id="popover-trigger-click-root-close" title="Ciriculum"><ul><li>Ciriculum A</li><li>Ciriculum B</li><li>Ciriculum C</li></ul></Popover>
  }

  const lessonRows = () => {
      const reduceLessonTypes = (lesson, index) => {
          return _.reduce(lesson.type, (types, type) => {
              index++
              let isLastLessonType = index === lesson.type.length
              return isLastLessonType ? types + `${type}` : types + `${type}, `
          }, "")
      }

      return _.map(lessons, lesson => {
          let index = 0
          return (
              <tr key={lesson.lessonName}>
                <OverlayTrigger trigger="click" rootClose placement="right" overlay={ciriculumPopover()}>
                  <td>{lesson.lessonName}</td>
                </OverlayTrigger>
                <td>
                    {reduceLessonTypes(lesson, index)}
                </td>
              </tr>
          )
      })
  }

  return (
    <Row>
        <Col md={12}>
            <h3>{_.replace(grade, "Grade", " Grade")}</h3>
        </Col>
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
                </tr>
              </thead>
              <tbody>
                  {lessonRows()}
              </tbody>
            </Table>
        </Col>
    </Row>
  )
}

export default LessonTable
