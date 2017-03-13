require('firebase/storage')
require('firebase/auth')
require('firebase/database')
import config from '../../firebase.config'

const firebase = require("firebase/app")

class Firebase {
  constructor() {
    try {
      firebase.app()
    } catch (error) {
      console.log("Initializing Firebase")
      firebase.initializeApp(config);
    }
    // avoid using # [ ] * ?
    firebase.auth().signInAnonymously().then( response => {
      console.log("success unauth login: ", response)
      // TODO pass in the selected grade to constructor get it and "all" ref
      // TODO download the lesson objects from the retrieved urls and display
    //   this.database.ref("/first").once("value").then( snapshot => {
    //       console.log(snapshot.val())
    //   })
    //   this.download()
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });

    this.database = firebase.database()
    this.storageReference = firebase.storage().ref()
    this.download = this.download.bind(this)
  }

  upload(lessonObject) {
    const blob = new Blob([JSON.stringify(lessonObject.files)], {type : 'application/json'});

    const newLessonPath = `lessons/${lessonObject.lessonName}.json`
    const newLessonReference = this.storageReference.child(newLessonPath)

    newLessonReference.put(blob).then( snapshot => {
      console.log("Uploaded ", snapshot)
    }).catch( error => {
      console.error(error)
    })

    newLessonReference.getDownloadURL().then( url => {
        const dbUploadObject = {...lessonObject, files: url}
        // TODO upload this object to real-time database with newLessonPath
    })
    // this.files.put(file[0]).then( snapshot => {
    //   console.log("Uploaded ", snapshot)
    // }).catch( error => {
    //   console.error(error)
    // })
  }

  downloadResource(url) {
      // TODO download resource for a specific lesson
      // TODO do an agent.get call to url - parse json into array of json -> files
  }

  downloadLessons() {
      // TODO create path to lessons from each grade
      // pass back all the whole object for use by UI
  }
}

export default Firebase
