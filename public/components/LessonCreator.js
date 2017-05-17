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
            lessonType: [{displayName: "Vocal", checked: false }, {displayName: "Instrumental", checked: false }, {displayName: "Movement", checked: false }, {displayName: "Listening", checked: false }],
            gradeLevel: [{displayName: "Kindergarten", checked: false }, {displayName: "1st Grade", checked: false }, {displayName: "2nd Grade", checked: false }, {displayName: "3rd Grade", checked: false }, {displayName: "4th Grade", checked: false }, {displayName: "5th Grade", checked: false }],
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
        this.renderCheckboxes = this.renderCheckboxes.bind(this)
        this.currentView = this.currentView.bind(this)
        this.renderLessonForm = this.renderLessonForm.bind(this)
        this.toggleView = this.toggleView.bind(this)
        this.toggleSelected = this.toggleSelected.bind(this)
    }

    // TODO handle form validation
    prepareForUpload() {
        const checkboxValues = (checkboxes) => {
            //console.log(checkboxes)
            const values = _.map(checkboxes, checkbox => {
                return checkbox.checked ? checkbox.displayName : undefined
            })
            return _.compact(values, undefined)
        }

        function mapSelectedCurriculum(lessonCurriculum) {
            return _.map(lessonCurriculum, curriculum => {
                return { category: curriculum.displayName, selectedValues: _.map(_.filter(curriculum.values, value => value.selected), "displayName")}
            })
        }

        console.log("before upload logic")
        let uploadLessonType = checkboxValues(this.state.lessonType)
        let uploadLessonCurriculum = mapSelectedCurriculum(this.state.lessonCurriculum)
        let uploadGradeLevel = checkboxValues(this.state.gradeLevel)

        const uploadObject = {
            lessonName: this.state.lessonName,
            lessonSource: this.state.lessonSource,
            files: this.state.files,
            type: uploadLessonType,
            curriculum: uploadLessonCurriculum,
            grade: uploadGradeLevel
        }

        console.log(`Uploading ${JSON.stringify(uploadObject)}`)
        // TODO
        //this.props.upload(uploadObject)
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
                    newFiles.push(droppedFile)
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

    renderCheckboxes(items, columnSize, stateKey) {
        const checkboxClicked = ({target}) => {
            const displayName = target.id

            const index = _.findIndex(this.state[stateKey], {"displayName": displayName})

            if (index === -1) { console.error(`didn't find ${displayName} in ${this.state[stateKey]} : ${stateKey} : ${this.state.gradeLevel}`); return }

            let newState = this.state[stateKey]
            newState[index] = {"displayName": displayName, checked: target.checked }

            this.setState({stateKey: newState})
        }

        let counter = -1
        return _.map(items, item => {
            const index = _.findIndex(this.state[stateKey], {"displayName": item})

            if (index === -1) { console.error(`didn't find ${displayName} in ${this.state[stateKey]} : ${stateKey} : ${this.state.gradeLevel}`); return }

            counter++
            return (
                <Col md={columnSize} key={`checkbox: ${items[counter]}`} >
                    <Checkbox id={item} inline onChange={checkboxClicked} checked={this.state[stateKey][index].checked} >
                        {item}
                    </Checkbox>
                </Col>
            )
        })
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
                        <FormControl type="text" placeholder="Name" onChange={this.handleChange.bind(this, "lessonName")}/>
                    </Col>
                </Row>
                <Row className="form-margin">
                    <Col md={12}>
                        <ControlLabel>Source</ControlLabel>
                        <FormControl type="text" placeholder="Source" onChange={this.handleChange.bind(this, "lessonSource")}/>
                    </Col>
                </Row>
                <ControlLabel>Resources: Drag & Drop files</ControlLabel>
                <Well onDragOver={(event) => event.preventDefault()} onDrop={this.dropUpload} >{this.viewFiles()}</Well>
                <Well className={this.props.backgroundColor} >
                    <ControlLabel className="form-margin">Lesson Type</ControlLabel>
                    <Row>
                        {this.renderCheckboxes(_.map(this.state.lessonType, "displayName"), 3, "lessonType")}
                    </Row>
                </Well>
                <div className="form-margin"></div>
                <Well className={this.props.backgroundColor} >
                    <ControlLabel className="form-margin">Grade Level</ControlLabel>
                    <Row>
                        {this.renderCheckboxes(_.slice(_.map(this.state.gradeLevel, "displayName"), 0, 3), 4, "gradeLevel")}
                    </Row>
                    <div className="form-margin"></div>
                    <Row>
                        {this.renderCheckboxes(_.slice(_.map(this.state.gradeLevel, "displayName"), 3, this.state.gradeLevel.length), 4, "gradeLevel")}
                    </Row>
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
