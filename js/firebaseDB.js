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
// let uploader = document.getElementById('imgupload');
let fileButton = document.getElementById('imgupload');

// Create references
const dbRefObject = firebase.database().ref().child('object');
const dbRefList = dbRefObject.child('posts');
const dbRefPostCount = dbRefObject.child('postCount');
let postCount;
let user;

let userProfile = localStorage.getItem("pfp")
document.getElementById('userProfile').src = userProfile;

//Listen for file Selection
fileButton.addEventListener('change', function(e){
    //Get file
    let file = e.target.files[0];
    //create a storage ref
    let storageRef = firebase.storage().ref('posts/post' + (postCount+1));
    //Upload fi    
    let task = storageRef.put(file);

    //Update progress bar
    task.on('state_changed', 
        function progress(snapshot){
            // let percentage = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
            // uploader.value = percentage;
        },
        function error(err){
            alert("An unexpected error occured. Please try again :(");
        },
        function complete(snapshot){
            document.getElementById('fileIcon').style = "color: green;";
        }
    );
});

dbRefList.on('child_added', snap => {
    let info = snap.val()
    let author = info.author;
    let pfp = info.pfp;
    let title = info.title;
    let body = info.body;
    let tags = info.tag;
    let time = info.time;
    let img = info.img;

    let post;

    post += "<div class='post'><div class='header'><div><img class='profile-picture' src='"
    post += pfp
    post += "'><p class='username'>"
    post += author
    post += "</p></div>"
    if (author = localStorage.getItem("username")) {
        post += "<div class='delete'><a onclick = 'deletePost()'><i class='fas fa-trash'></i></a></div>"
    }
    post += "</div><div class='container'><p class='date'>"
    post += time
    post += "</p></div><div class='container'><h1 class='title'>"
    post += title
    post += "</h1></div><div class='container tags'>"
    for (let i = 0; i < tags.length; i++) {
        post += "<button>"
        post += tags[i]
        post += "</button>"
    }
    post += "</div>"

    // TODO: If image exists only
    post += "<div class='container'><img src='"
    post += img
    post += "'>"
    post += "<div class='container'><p class='body'>"
    post += body
    post += "</p></div></div></div><br>"

    document.getElementById("post-collection").innerHTML += post;
});

// Sync counter changes
dbRefPostCount.on('value', snap => {
    postCount = snap.val();
});

let dltButton = document.createElement('button');
dltButton.setAttribute('id', 'dltButton' + postCount);
dltButton.innerHTML = 'dltButton' + postCount;
document.body.appendChild(dltButton);

// Function to create a new post
createPost = () => {

    let date = new Date(Date.now()).toString().split(" ");

    dbRefList.child("post" + (postCount + 1)).set({
        author: localStorage.getItem("username"),
        pfp: localStorage.getItem("pfp"),
        title: document.getElementById('title').innerHTML,
        body: document.getElementById('body').innerHTML,
        tag: document.getElementById('tags').innerHTML.toLowerCase().split(" "),
        time: date[0] + " " + date[1] + " " + date[2] + " " + date[3]+ " " + date[4],
        img: "https://firebasestorage.googleapis.com/v0/b/uofthacks2021-298a3.appspot.com/o/posts%2Fpost" + (postCount+1) + "?alt=media"
    });
    
    dbRefPostCount.set(postCount + 1);
}

deletePost = () => {

}