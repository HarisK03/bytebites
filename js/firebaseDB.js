// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBwytOWnI8AqaVTf9LUrc4nWIk4p9-3Scw",
    authDomain: "uofthacks2021-298a3.firebaseapp.com",
    databaseURL: "https://uofthacks2021-298a3-default-rtdb.firebaseio.com",
    projectId: "uofthacks2021-298a3",
    storageBucket: "uofthacks2021-298a3.appspot.com",
    messagingSenderId: "63017197391",
    appId: "1:63017197391:web:87ea5611aecc4d95a12f3a",
    measurementId: "G-L6NQG7YLL7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Get elements
const preObject = document.getElementById('object');
const ulList = document.getElementById('list')

// Create references
const dbRefObject = firebase.database().ref().child('object');
const dbRefList = dbRefObject.child('posts');

// Sync object changes
dbRefObject.on('value', snap => {
    preObject.innerText = JSON.stringify(snap.val(), null, 3)
});

//sync list changes
dbRefList.on('child_added', snap=> {
    let post = snap.val()

    console.log(post)
    const liA = document.createElement("li")
    const liT = document.createElement('li')
    const liB = document.createElement('li')
    liA.innerText = post.author;
    liT.innerText = post.title;
    liB.innerText = post.body;
    ulList.appendChild(liA);
    ulList.appendChild(liT);
    ulList.appendChild(liB);

});


