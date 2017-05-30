import agent from './agent'
import _ from "lodash"
require('firebase/storage')
require('firebase/auth')
require('firebase/database')

const firebase = require("firebase/app")

class Firebase {
    constructor(config) {
        try {
            firebase.app()
        } catch (error) {
            if (config === undefined) {
                throw "No config file"
            }
            console.log("Initializing Firebase")
            firebase.initializeApp(config);
        }

        this.database = firebase.database()
        this.storageReference = firebase.storage().ref()
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
        return firebase.auth().signInWithEmailAndPassword(email, password)
    }

    signInUser(firebase) {
        const user = firebase.auth().currentUser
        if (user) {
            return user
        }
    }

    upload(lessonObject) {
        const newLessonPath = `lessons/${lessonObject.lessonName}`

        const newLessonReference = this.storageReference.child(newLessonPath)

        let uploads = _.map(lessonObject.files, file => newLessonReference.put(file))

        Promise.all(uploads).then( snapshots => {
            console.log("Snapshots", snapshots)
            const downloadURLs = _.map(snapshots, snapshot => snapshot.downloadURL)

            console.log(downloadURLs)

            const dbUploadObject = {...lessonObject, files: downloadURLs}

            let newPostKey = this.database.ref().child("lessons").push().key
            let newLesson = {}
            newLesson[newPostKey] = dbUploadObject

            return this.database.ref("lessons/").update(newLesson)
        }).catch( error => {
            console.error(error)
        })
    }

    downloadLessons() {
        return this.database.ref("lessons").once("value")
    }
}

export default Firebase
