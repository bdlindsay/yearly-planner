import React from "react"
import { Table, Popover, OverlayTrigger, Col, Row } from "react-bootstrap"
import _ from "lodash"

const LessonTable = ({lessons, grade}) => {
  const ciriculumPopover = () => {
    return <Popover id="popover-trigger-click-root-close" title="Ciriculum"><ul><li>Ciriculum A</li><li>Ciriculum B</li><li>Ciriculum C</li></ul></Popover>
  }

  const lessonRows = () => {
      const reduceLessonTypes = (lessonKey, index) => {
          return _.reduce(lessons[lessonKey].type, (types, type) => {
              index++
              let isLastLessonType = index === lessons[lessonKey].type.length
              return isLastLessonType ? types + `${type}` : types + `${type}, `
          }, "")
      }

      return _.map(_.keys(lessons), lessonKey => {
          let index = 0
          return (
              <tr key={lessons[lessonKey].lessonName}>
                <OverlayTrigger trigger="click" rootClose placement="right" overlay={ciriculumPopover()}>
                  <td>{lessons[lessonKey].lessonName}</td>
                </OverlayTrigger>
                <td>
                    {reduceLessonTypes(lessonKey, index)}
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
