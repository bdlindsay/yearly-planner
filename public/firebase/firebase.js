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
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });

    this.storageReference = firebase.storage().ref()
    this.files = this.storageReference.child("files")
  }

  upload(file) {
    console.log(file)
    console.log(file[0].name)
    this.files.put(file[0]).then( snapshot => {
      console.log("Uploaded ", snapshot)
    }).catch( error => {
      console.error(error)
    })
  }
}

export default Firebase
