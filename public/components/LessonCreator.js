import React from "react"
import { Grid, Row, Col, FormControl, FormGroup, Button, Checkbox, ControlLabel, Well } from "react-bootstrap"
import _ from "lodash"
import CurriculumTabs from "./Curriculum"
import curriculumReference from "../../curriculumReference"

class LessonCreator extends React.Component {
    constructor({ upload, backgroundColor }) {
        super()
        // TODO grade level is getting stuff added to it automattically
        let dynamicsTempo = _.flatMap(curriculumReference, gradeRef => { return _.flatMap(gradeRef.dynamicsTempo, curriculum => { return { displayName: curriculum, selected: false } }) })
        let form = _.flatMap(curriculumReference, gradeRef => { return _.flatMap(gradeRef.form, curriculum => { return { displayName: curriculum, selected: false } }) })
        let musicianship = _.flatMap(curriculumReference, gradeRef => { return _.flatMap(gradeRef.musicianship, curriculum => { return { displayName: curriculum, selected: false } }) })
        let pitch = _.flatMap(curriculumReference, gradeRef => { return _.flatMap(gradeRef.pitch, curriculum => { return { displayName: curriculum, selected: false } }) })
        let rhythm = _.flatMap(curriculumReference, gradeRef => { return _.flatMap(gradeRef.rhythm, curriculum => { return { displayName: curriculum, selected: false } }) })
        let timbre = _.flatMap(curriculumReference, gradeRef => { return _.flatMap(gradeRef.timbre, curriculum => { return { displayName: curriculum, selected: false } }) })
        let movementTypes = _.flatMap(curriculumReference, gradeRef => { return _.flatMap(gradeRef.movementTypes, curriculum => { return { displayName: curriculum, selected: false } }) })

        this.state = {
            isFormShowing: true,
            files: [],
            lessonName: "",
            lessonSource: "",
            lessonType: [{displayName: "Vocal", selected: false }, {displayName: "Instrumental", selected: false }, {displayName: "Movement", selected: false }, {displayName: "Listening", selected: false }],
            gradeLevel: [{displayName: "Kindergarten", selected: false }, {displayName: "1st Grade", selected: false }, {displayName: "2nd Grade", selected: false }, {displayName: "3rd Grade", selected: false }, {displayName: "4th Grade", selected: false }, {displayName: "5th Grade", selected: false }],
            lessonMonths: [
                {key: 0, displayName: "January", selected: false},
                {key: 1, displayName: "February", selected: false},
                {key: 2, displayName: "March", selected: false},
                {key: 3, displayName: "April", selected: false},
                {key: 4, displayName: "May", selected: false},
                {key: 5, displayName: "June", selected: false},
                {key: 6, displayName: "July", selected: false},
                {key: 7, displayName: "August", selected: false},
                {key: 8, displayName: "September", selected: false},
                {key: 9, displayName: "October", selected: false},
                {key: 10, displayName: "November", selected: false},
                {key: 11, displayName: "December", selected: false},
            ],
            lessonCurriculum: [
                {
                    displayName: "Dynamics/Tempo",
                    values: _.uniqBy(dynamicsTempo, item => item.displayName),
                    key: 0
                },
                {
                    displayName: "Form",
                    values: _.uniqBy(form, item => item.displayName),
                    key: 1
                },
                {
                    displayName: "Musicianship",
                    values: _.uniqBy(musicianship, item => item.displayName),
                    key: 2
                },
                {
                    displayName: "Pitch",
                    values: _.uniqBy(pitch, item => item.displayName),
                    key: 3
                },
                {
                    displayName: "Rhythm",
                    values: _.uniqBy(rhythm, item => item.displayName),
                    key: 4
                },
                {
                    displayName: "Timbre",
                    values: _.uniqBy(timbre, item => item.displayName),
                    key: 5
                },
                {
                    displayName: "Movement Types",
                    values: _.uniqBy(movementTypes, item => item.displayName),
                    key: 6
                }

            ]
        }

        this.prepareForUpload = this.prepareForUpload.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.dropUpload = this.dropUpload.bind(this)
        this.viewFiles = this.viewFiles.bind(this)
        this.currentView = this.currentView.bind(this)
        this.renderLessonForm = this.renderLessonForm.bind(this)
        this.toggleView = this.toggleView.bind(this)
        this.toggleSelected = this.toggleSelected.bind(this)
    }

    // TODO handle form validation
    prepareForUpload() {
        const boxSelectValues = (boxSelects) => {
            //console.log(checkboxes)
            const values = _.map(boxSelects, boxSelect => {
                return boxSelect.selected ? boxSelect.displayName.replace(/\s/, "") : undefined
            })
            return _.compact(values, undefined)
        }

        function mapSelectedCurriculum(lessonCurriculum) {
            return _.map(lessonCurriculum, curriculum => {
                return { category: curriculum.displayName, selectedValues: _.map(_.filter(curriculum.values, value => value.selected), "displayName")}
            })
        }

        let uploadLessonType = boxSelectValues(this.state.lessonType)
        let uploadLessonCurriculum = mapSelectedCurriculum(this.state.lessonCurriculum)
        let uploadGradeLevel = boxSelectValues(this.state.gradeLevel)
        let uploadLessonMonths = boxSelectValues(this.state.lessonMonths)

        const uploadObject = {
            lessonName: this.state.lessonName,
            lessonSource: this.state.lessonSource,
            files: this.state.files,
            type: uploadLessonType,
            curriculum: uploadLessonCurriculum,
            grade: uploadGradeLevel,
            months: uploadLessonMonths
        }

        this.props.upload(uploadObject)
    }

    handleChange(stateVariable, {target}) {
        let change = {}
        change[stateVariable] = target.value
        this.setState(change)
    }

    toggleSelected({target}) {
        const selectedItem = JSON.parse(target.id)

        let newLessonCurriculum = this.state.lessonCurriculum
        newLessonCurriculum[selectedItem.categoryKey].values[selectedItem.curriculumKey].selected = !selectedItem.selected

        this.setState({lessonCurriculum: newLessonCurriculum})
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

                    let newFiles = this.state.files
                    newFiles.push({data: droppedFile, name: droppedFile.name})
                    this.setState({files: newFiles})
                }
            }
        }
    }

    viewFiles() {
        const removeFileAtIndex = (index) => {
            console.log(index)
            let newFiles = this.state.files
            newFiles.splice(index, 1)

            this.setState({files: newFiles})
        }

        return (
            <Row className="form-margin">
                {_.map(this.state.files, ({name}, index) => <Col className="file-margin" md={12} key={index} onClick={removeFileAtIndex.bind(this, index)} >{name} <b>Ⓧ</b></Col>)}
            </Row>
        )
    }

    toggleView() {
        this.setState({ isFormShowing: !this.state.isFormShowing })
    }

    currentView() {
        return this.state.isFormShowing ? this.renderLessonForm() : <CurriculumTabs tabCategories={this.state.lessonCurriculum} toggleSelected={this.toggleSelected} color={this.state.color} />
    }

    renderBoxSelects(items, stateKey, columnSize) {
        const boxSelected = ({target}) => {
            const displayName = target.id

            const index = _.findIndex(this.state[stateKey], {"displayName": displayName})

            if (index === -1) { console.error(`didn't find ${displayName} in ${this.state[stateKey]} : ${stateKey} : ${this.state.gradeLevel}`); return }

            let newState = this.state[stateKey]
            let boxSelect = newState[index]
            newState[index] = {displayName, key: boxSelect.key, selected: !boxSelect.selected }

            let stateObject = {}
            stateObject[stateKey] = newState
            this.setState(stateObject)
        }

        const contents =  _.map(items, item => {
            return <Col md={columnSize} key={item.displayName} ><Col md={12} id={item.displayName} className={`box-select ${item.selected ? "box-select-selected" : ""}`} onClick={boxSelected} >{item.displayName}</Col></Col>
        })

        return (
            <center>
            <Row>
                {contents}
            </Row>
            </center>
        )
    }

    renderLessonForm() {
        return (
            <FormGroup bsSize="large" controlId="upload">
                <Row className="form-margin">
                    <Col md={12}>
                        <h2>Create a Lesson:</h2>
                    </Col>
                </Row>
                <Row className="form-margin">
                    <Col md={12}>
                        <ControlLabel>Name</ControlLabel>
                        <FormControl type="text" placeholder="Name" onChange={this.handleChange.bind(this, "lessonName")} value={this.state.lessonName} />
                    </Col>
                </Row>
                <Row className="form-margin">
                    <Col md={12}>
                        <ControlLabel>Source</ControlLabel>
                        <FormControl type="text" placeholder="Source" onChange={this.handleChange.bind(this, "lessonSource")} value={this.state.lessonSource} />
                    </Col>
                </Row>
                <ControlLabel>Resources: Drag & Drop files</ControlLabel>
                <Well onDragOver={(event) => event.preventDefault()} onDrop={this.dropUpload} >{this.viewFiles()}</Well>
                <Well>
                    <ControlLabel className="form-margin">Lesson Type</ControlLabel>
                    {this.renderBoxSelects(this.state.lessonType, "lessonType", 3)}
                </Well>
                <div className="form-margin"></div>
                <Well>
                    <ControlLabel className="form-margin">Grade Level</ControlLabel>
                    <Row>
                        {this.renderBoxSelects(this.state.gradeLevel, "gradeLevel", 4)}
                    </Row>
                </Well>
                <div className="form-margin"></div>
                <Well>
                    <ControlLabel className="form-margin">Months Taught In</ControlLabel>
                    {this.renderBoxSelects(this.state.lessonMonths, "lessonMonths", 3)}
                </Well>
            </FormGroup>
        )
    }

    renderUploadButton() {
        if (this.state.isFormShowing) {
            return (
                <Row className="separatingMargin">
                    <Col md={12}>
                        <Button bsStyle="primary" bsSize="large" onClick={this.prepareForUpload} block>Upload</Button>
                    </Col>
                </Row>
            )
        } else { return }
    }

    renderCurriculumButton(shouldShow) {
        if (shouldShow) {
            return (
                <Row className="form-margin">
                    <Col md={12}>
                        <Button bsStyle="info" bsSize="large" block onClick={this.toggleView} >{this.state.isFormShowing ? "Curriculum" : "Back" }</Button>
                    </Col>
                </Row>
            )
        } else { return }
    }

    render(){
        return  (
            <Grid>
                {this.renderCurriculumButton(!this.state.isFormShowing)}
                {this.currentView()}
                <div className="separatingMargin"></div>
                {this.renderCurriculumButton(true)}
                <hr/>
                {this.renderUploadButton()}
                <hr/>
            </Grid>
        )
    }
}

export default LessonCreator
