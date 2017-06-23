import React from "react"
import { Link } from "react-router"
import { Table, Popover, OverlayTrigger, Col, Row, InputGroup, FormControl, Glyphicon, Image, Button, Well, ControlLabel } from "react-bootstrap"
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

        return _.map(lessons, lesson => {
            let index = 0
            return (
                <tr onClick={tableRowSelected.bind(this, lesson)} key={lesson.lessonName} >
                    <td>{lesson.lessonName}</td>
                    <td>{reduceLessonTypes(lesson, index)}</td>
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


        const downloadResourceLinks = (selectedLesson) => {
            let count = -1
            return _.map(selectedLesson.files, file => {
                count++
                return (
                    <Col md={12} key={`${count}-${file.name}`}>
                        <a href={file.url} download={file.name} className="download-link">{file.name}</a>
                    </Col>
                )
            })
        }

        const displayValues = [
            selectedLesson.lessonName,
            selectedLesson.lessonSource,
            selectedLesson.type.join(", "),
            selectedLesson.grade.join(", "),
            selectedLesson.months.join(", "),
            displayCurriculum(selectedLesson.curriculum)
        ]
        const displayKeys = ["Name: ", "Source: ", "Type: ", "Grade Level: ", "Applicable Months: ", "Curriculum: "]

        return (
            <div>
                {shouldShowDetails ? renderBackFromDetailsButton() : undefined }
                <Col md={12} >
                    <Well>
                        <Row>
                            {displayValues.map( (displayValue, index) => {
                                return (
                                    <div className="bottom-form-spacing" key={displayKeys[index]} >
                                        <ControlLabel>{displayKeys[index]}</ControlLabel>
                                        <Col md={12}>{displayValue}</Col>
                                    </div>
                                )
                            })}
                        </Row>
                        <Row><b>Resources:</b></Row>
                        <Row>
                            <Well>
                                <Row>
                                {downloadResourceLinks(selectedLesson)}
                                </Row>
                            </Well>
                        </Row>
                    </Well>
                </Col>
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

    const renderBackFromDetailsButton = () => {
        return (
            <Col className="form-margin" md={12}>
                <Button onClick={handleToggle.bind(this, "shouldShowDetails")} >Back</Button>
            </Col>
        )
    }

    return (
        <Row>
            <Col md={12}>
                <h3>{_.replace(grade, "Grade", " Grade")}</h3>
            </Col>
            <Col md={12}>
                {shouldShowDetails ? renderLessonDetails() : renderLessonTable()}
            </Col>
        </Row>
    )
}

export default LessonTable
