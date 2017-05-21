import React from "react"
import { Navbar, Nav, NavItem, Table, Button, Col, Row } from "react-bootstrap"
import styles from "../styles/styles.css"
import { Link } from "react-router"
import NavBar from "../components/navBar"
import Firebase from "../firebase/firebase"
import LessonCreator from "../components/LessonCreator"
import Login from "../components/Login"

class Home extends React.Component
{
    constructor() {
        super();

        const listener = (user) => {
            if (user) {
                console.log("Signed-in!")

                this.isSignedIn = true
                this.setState({isSignedIn: true})
            } else {
                console.log("Signed-out :(")
                this.isSignedIn = false
                this.setState({isSignedIn: false, hasFailedSignIn: false})
            }
        }
        this.listener = listener

        try {
            this.firebase = new Firebase()
            this.firebase.setAuthenticationListener(this.listener)
            this.isSignedIn = true
        } catch(error) {
            this.isSignedIn = false
        }

        this.state = {
            shouldShowCreateView: false,
            isSignedIn: this.isSignedIn,
            email: "",
            password: "",
            hasFailedSignIn: false,
            config: null
        }

        this.buttonText = this.buttonText.bind(this)
        this.currentView = this.currentView.bind(this)
        this.gradeButtons = this.gradeButtons.bind(this)
        this.uploadToFirebase = this.uploadToFirebase.bind(this)
        this.toggleCreate = this.toggleCreate.bind(this)
        // TODO redirects?
        this.signInWithEmailAndPassword = this.signInWithEmailAndPassword.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.dropConfig = this.dropConfig.bind(this)
    }

    dropConfig(event)
    {
        event.preventDefault()

        var dataTransfer = event.dataTransfer;
        if (dataTransfer.items)
        {
            // Use DataTransferItemList interface to access the file(s)
            for (let i=0; i < dataTransfer.items.length; i++)
            {
                if (dataTransfer.items[i].kind == "file") {
                    var droppedFile = dataTransfer.items[i].getAsFile();
                    console.log("file[" + i + "].name = " + droppedFile.name);

                    const reader = new FileReader()
                    reader.onload = (event) =>
                    {
                        console.log(event.target.result)
                        const newConfigFile = JSON.parse(event.target.result)
                        this.setState({configFile: newConfigFile})
                    }
                    reader.readAsText(droppedFile)

                    break
                }
            }
        }
    }

    handleChange(stateVariable, {target})
    {
        let change = {}
        change[stateVariable] = target.value
        this.setState(change)
    }

    signInWithEmailAndPassword()
    {
        if (!this.state.configFile)
        {
            this.setState({hasFailedSignIn: true})
            return
        }
        this.firebase = new Firebase(this.state.configFile)
        this.firebase.setAuthenticationListener(this.listener)

        this.firebase.authenticate(this.state.email, this.state.password).then( response =>
            {
                console.log(`${this.state.email} was successfully signed-in`)
                this.setState({isSignedIn: true, password: "" })
            }).catch(error =>
            {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(`Login Error: ${errorCode}: ${errorMessage}`)
                this.setState({ hasFailedSignIn: true, password: "" })
            })
    }
    // Create view Package
    uploadToFirebase(uploadObject)
    {
        for (const file of uploadObject.files) {
            console.log("Uploading" + JSON.stringify(file))
            //this.firebase.upload(file)
        }

        console.log("Uploading" + JSON.stringify(uploadObject))
        this.firebase.upload(uploadObject) // TODO callback for when it has successfully uploaded?
    }

    buttonText()
    {
        return this.state.shouldShowCreateView ? "Cancel" : "Add a Lesson"
    }

    currentView()
    {
        return (
            <div className="nav-top-margin row grade-btn-padding">
                { this.state.shouldShowCreateView ? <LessonCreator upload={this.uploadToFirebase} backgroundColor="white" /> : this.gradeButtons() }
            </div>
        )
    }

    toggleCreate()
    {
        this.state.shouldShowCreateView ? this.setState({shouldShowCreateView: false}) : this.setState({shouldShowCreateView: true})
    }
    // End create view package

    render()
    {
        return (
            <div>
                <div className="row">
                    <NavBar showMonths={false} addLessonToggle={this.toggleCreate} addLessonText={this.buttonText()} isSignedIn={this.state.isSignedIn} signOut={_.get(this, "firebase.signOut", (() => {})) } />
                </div>
                {this.state.isSignedIn ? this.currentView() : <Login handleChange={this.handleChange}
                attemptSignIn={this.signInWithEmailAndPassword}
                hasFailedSignIn={this.state.hasFailedSignIn}
                dropConfig={this.dropConfig}
                hasConfig={this.state.configFile}/>}
            </div>
        )
    }

    gradeButtons()
    {
        return (
            <div className="row">
                <div className="row">
                    <div className="col-md-4 grade-btn-padding">
                        <center><Link to="/lessons/Kindergarten">
                            <Button
                                id={0}
                                bsClass="btn grade-btn yellow "
                                bsSize="large"
                                onClick={this.state.gradeSelect}>
                                Kindergarten
                            </Button>
                        </Link></center>
                    </div>
                    <div className="col-md-4 grade-btn-padding">
                        <center><Link to="/lessons/1stGrade">
                            <Button
                                id={1}
                                bsClass="btn grade-btn green"
                                bsSize="large"
                                onClick={this.state.gradeSelect}>
                                1<sup>st</sup> Grade
                            </Button>
                        </Link></center>
                    </div>
                    <div className="col-md-4 grade-btn-padding">
                        <center><Link to="/lessons/2ndGrade">
                            <Button
                                id={2}
                                bsClass="btn grade-btn orange"
                                bsSize="large"
                                onClick={this.state.gradeSelect}>
                                2<sup>nd</sup> Grade
                            </Button>
                        </Link></center>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 grade-btn-padding">
                        <center><Link to="/lessons/3rdGrade">
                            <Button
                                id={3}
                                bsClass="btn grade-btn red"
                                bsSize="large"
                                onClick={this.state.gradeSelect}>
                                3<sup>rd</sup> Grade
                            </Button>
                        </Link></center>
                    </div>
                    <div className="col-md-4 grade-btn-padding">
                        <center><Link to="/lessons/4thGrade">
                            <Button
                                id={4}
                                bsClass="btn grade-btn purple"
                                bsSize="large"
                                onClick={this.state.gradeSelect}>
                                4<sup>th</sup> Grade
                            </Button>
                        </Link></center>
                    </div>
                    <div className="col-md-4 grade-btn-padding">
                        <center><Link to="/lessons/5thGrade">
                            <Button
                                id={5}
                                bsClass="btn grade-btn blue"
                                bsSize="large"
                                onClick={this.state.gradeSelect}>
                                5<sup>th</sup> Grade
                            </Button>
                        </Link></center>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home
