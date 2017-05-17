require('firebase/storage')
require('firebase/auth')
require('firebase/database')
//import config from '../../firebase.config'

const firebase = require("firebase/app")

class Firebase {
    constructor(config) {
        try {
            firebase.app()
        } catch (error) {
            if (config === undefined) {
                if (process.env.NODE_ENV === "development") {
                    config = require("../../firebase.config").config
                } else { throw "No config file" }
            }
            console.log("Initializing Firebase")
            firebase.initializeApp(config);
        }

        this.database = firebase.database()
        this.storageReference = firebase.storage().ref()
        this.downloadResource = this.downloadResource.bind(this)
        this.downloadLessons = this.downloadLessons.bind(this)
        this.authenticate = this.authenticate.bind(this)
        this.signInUser = this.signInUser.bind(this)
    }

    signOut() {
        firebase.auth().signOut().then( () => {
            console.log("signed out")
        }).catch ( error => {
            console.log(`Error: ${error}`)
        })
    }

    setAuthenticationListener(listener) {
        firebase.auth().onAuthStateChanged(listener)
    }

    authenticate(email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password).catch( error => console.log(error))
    }

    signInUser(firebase) {
        const user = firebase.auth().currentUser
        if (user) {
            return user
        }
    }

    upload(lessonObject) {
        if (lessonObject.files.length > 0) {
            const newLessonPath = `lessons/${lessonObject.lessonName}`
            const blob = new Blob([JSON.stringify(lessonObject.files)], {type : 'application/json'});

            const newLessonReference = this.storageReference.child(newLessonPath)

            newLessonReference.put(blob).then( snapshot => {
                console.log("Uploaded ", snapshot)
            }).catch( error => {
                console.error(error)
            })

            newLessonReference.getDownloadURL().then( url => {
                const dbUploadObject = {...lessonObject, files: url}
                // TODO upload this object to real-time database with newLessonPath
                let newPostKey = this.database.ref().child("lessons").push().key
                let newLesson = {}
                newLesson[newPostKey] = dbUploadObject

                return this.database.ref("lessons/").update(newLesson)
            })
        } else {
            const dbUploadObject = {...lessonObject, files: null}
            // TODO upload this object to real-time database with newLessonPath
            let newPostKey = this.database.ref().child("lessons").push().key
            let newLesson = {}
            newLesson[newPostKey] = dbUploadObject

            return this.database.ref("lessons/").update(newLesson)
        }
    }

    downloadResource(url) {
        // TODO download resource for a specific lesson
        // TODO do an agent.get call to url - parse json into array of json -> files
    }

    downloadLessons() {
        // TODO create path to lessons from each grade
        // pass back all the whole object for use by UI
        return this.database.ref("lessons").once("value")
    }
}

export default Firebase
