import agent from './agent'
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

            return newLessonReference.put(blob).then( snapshot => {
                console.log("Uploaded File", snapshot)

                const dbUploadObject = {...lessonObject, files: snapshot.downloadURL}

                let newPostKey = this.database.ref().child("lessons").push().key
                let newLesson = {}
                newLesson[newPostKey] = dbUploadObject

                return this.database.ref("lessons/").update(newLesson)
            }).catch( error => {
                console.error(error)
            })
        } else {
            const dbUploadObject = {...lessonObject, files: undefined}
            // TODO upload this object to real-time database with newLessonPath
            let newPostKey = this.database.ref().child("lessons").push().key
            let newLesson = {}
            newLesson[newPostKey] = dbUploadObject

            return this.database.ref("lessons/").update(newLesson)
        }
    }

    downloadLessons() {
        return this.database.ref("lessons").once("value")
    }
}

export default Firebase
