
var currentUserUid = null;

const firebaseConfig = {
  apiKey: "AIzaSyACwNjJM_P60aB9OOIVsX4A0nh4g89GFqE",
  authDomain: "test-js-dd586.firebaseapp.com",
  databaseURL: "https://test-js-dd586.firebaseio.com",
  projectId: "test-js-dd586",
  storageBucket: "test-js-dd586.appspot.com",
  messagingSenderId: "980325498998",
  appId: "1:980325498998:web:918f3b283aa1029e945f57",
  measurementId: "G-N9E6ZBBXDN"
};




window.onload = function(event) {
  firebase.initializeApp(firebaseConfig);

  firebase.auth().onAuthStateChanged(function(user) {
    currentUserUid = user.uid;

    listenDatabaseChange();


  });

  const loginButton = document.getElementById('login_button');
  loginButton.addEventListener("click", loginWithEmailAndPassword);
  

  const createButton = document.getElementById('create_button');
  createButton.addEventListener('click',createDataItem);



  function loginWithEmailAndPassword() {
    const email = document.getElementById('email_input').value;
    const password = document.getElementById('password_input').value;


    firebase.auth().signInWithEmailAndPassword(email, password).then((res) => {
      currentUser = res.user;


      document.getElementById('email_input').remove();
      document.getElementById('password_input').remove();


    }).catch((err) => {
      console.log(err);
    });
  }

  function createDataItem() {
    const itemsRef = firebase.database().ref().child(`items/${currentUserUid}`).ref;
    const key  = itemsRef.push().key;
    console.log(key);

    const data = {
      key: {
        "name" : "champignons",
        "price": 10.0,
        "qty": "1kg"
      }
    }

    itemsRef.update(data).then(() => {
      console.log('success');
    }).catch((error) => {
      console.log(error);
    });
  }





  function listenDatabaseChange() {

    console.log(firebase);

    firebase.database().ref().child('items').child(currentUserUid).on('child_changed', function(event) {
      console.log(event.val());
    });
    firebase.database().ref().child('items').child(currentUserUid).on('child_added', function(event) {
      console.log(event.val());
    });
    firebase.database().ref().child('items').child(currentUserUid).on('child_removed', function(event) {
      console.log(event.val());
    });

  }
};