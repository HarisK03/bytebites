// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
let firebaseConfig = {
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
const ulList = document.getElementById('list');
let uploader = document.getElementById('uploader');
let fileButton = document.getElementById('fileButton');


// Create references
const dbRefObject = firebase.database().ref().child('object');
const dbRefList = dbRefObject.child('posts');
const dbRefPostCount = dbRefObject.child('postCount');
const provider = new firebase.auth.GoogleAuthProvider();
let postCount;

signIn = () => {
    console.log("FINALLY")
    firebase.auth().signInWithPopup(provider)
}


//Listen for file Selection
fileButton.addEventListener('change', function(e){
    //Get file
    let file = e.target.files[0];
    //create a storage ref
    let storageRef = firebase.storage().ref('posts/post' + (postCount+1));
    //Upload file
    let task = storageRef.put(file);

    
    //Update progress bar
    task.on('state_changed', 
        function progress(snapshot){
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
            uploader.value = percentage;
        },
        function error(err){
            
        },
        function complete(snapshot){
            
        }
    
    );

});

// Sync object changes
dbRefObject.on('value', snap => {
    preObject.innerText = JSON.stringify(snap.val(), null, 3)
});

// // Sync list changes
// dbRefList.on('child_added', snap => {
//     let post = snap.val()

//     console.log(post)
//     const liA = document.createElement('li')
//     const liT = document.createElement('li')
//     const liB = document.createElement('li')
//     liA.innerText = post.author;
//     liT.innerText = post.title;
//     liB.innerText = post.body;
//     ulList.appendChild(liA);
//     ulList.appendChild(liT);
//     ulList.appendChild(liB);

// });

// Sync counter changes
dbRefPostCount.on('value', snap => {
    postCount = snap.val();
});

// Function to create a new post
createPost = () => {

    let date = new Date(Date.now()).toString().split(" ");

    dbRefList.child("post" + (postCount + 1)).set({
        author: document.getElementById('author').value,
        title: document.getElementById('title').value,
        body: document.getElementById('body').value,
        tag: document.getElementById('tag').value.toLowerCase().split(" "),
        time: date[0] + " " + date[1] + " " + date[2] + " " + date[3]+ " " + date[4],
        img: "https://firebasestorage.googleapis.com/v0/b/uofthacks2021-298a3.appspot.com/o/posts%2Fpost" + (postCount+1) + "?alt=media"
    });

    dbRefPostCount.set(postCount + 1);
}
