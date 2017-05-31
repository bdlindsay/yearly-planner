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
        const uploads = _.map(lessonObject.files, file => {
            const newLessonPath = `lessons/${lessonObject.lessonName}-${file.name}`
            const newLessonReference = this.storageReference.child(newLessonPath)
            return newLessonReference.put(file.data)
        })

        Promise.all(uploads).then( snapshots => {
            console.log("Snapshots", snapshots)
            const downloadURLs = _.map(snapshots, snapshot => { return {url: snapshot.downloadURL, name: snapshot.ref.name} })

            console.log(downloadURLs)

            const dbUploadObject = Object.assign(lessonObject, { files: downloadURLs })

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
