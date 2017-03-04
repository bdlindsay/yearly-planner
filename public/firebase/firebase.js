require('firebase/storage')
require('firebase/auth')
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
      this.download()
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });

    this.storageReference = firebase.storage().ref()
    this.download = this.download.bind(this)
  }

  upload(lessonObject) {
    const blob = new Blob([JSON.stringify(lessonObject)], {type : 'application/json'});

    const newLessonReference = this.storageReference.child(`lessons/${lessonObject.lessonName}.json`)

    newLessonReference.put(blob).then( snapshot => {
      console.log("Uploaded ", snapshot)
    }).catch( error => {
      console.error(error)
    })
    // console.log(file)
    // console.log(file[0].name)
    // this.files.put(file[0]).then( snapshot => {
    //   console.log("Uploaded ", snapshot)
    // }).catch( error => {
    //   console.error(error)
    // })
  }

  download() {
    let lessonsPath = this.storageReference.child("lessons/My first grade object.json")
    lessonsPath.getDownloadURL().then( url => {
        // TODO do an agent.get call to url - parse json
    })
  }
}

export default Firebase
