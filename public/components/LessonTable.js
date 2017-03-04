import React from "react"
import { Table, Popover, OverlayTrigger } from "react-bootstrap"

const LessonTable = () => {
  const ciriculumPopover = () => {
    return <Popover id="popover-trigger-click-root-close" title="Ciriculum"><ul><li>Ciriculum A</li><li>Ciriculum B</li><li>Ciriculum C</li></ul></Popover>
  }
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Lesson Name</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <OverlayTrigger trigger="click" rootClose placement="right" overlay={ciriculumPopover()}>
            <td>My First Lesson</td>
          </OverlayTrigger>
          <td>
            Singing, Movement, Instrumental
          </td>
        </tr>
      </tbody>
    </Table>
  )
}

export default LessonTable
