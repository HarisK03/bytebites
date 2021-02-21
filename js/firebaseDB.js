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

// Sync counter changes
dbRefPostCount.on('value', snap => {
    postCount = snap.val();
});

lowerPostCount = (c) => {
    c = parseInt(c)-1;
    c = c.toString();
    while (c.length < 7) {
        c = "0" + c;
    }
    return c;
}

let userProfile = localStorage.getItem("pfp")
document.getElementById('userProfile').src = userProfile;


let hasImage = false;
//Listen for file Selection
fileButton.addEventListener('change', function(e){
    //Get file
    let file = e.target.files[0];
    //create a storage ref
    let storageRef = firebase.storage().ref('posts/post' + (lowerPostCount(postCount)));
    //Upload fi    
    let task = storageRef.put(file);

    //Update progress bar
    task.on('state_changed', 
        function progress(snapshot){
        },
        function error(err){
            alert("An unexpected error occured. Please try again :(");
        },
        function complete(snapshot){
            document.getElementById('fileIcon').style = "color: green;";
            hasImage = true;
        }
    );
});

dbRefList.on('child_added', snap => {
    if(!snap.val().isDeleted){
        let info = snap.val()
        let author = info.author;
        let pfp = info.pfp;
        let title = info.title;
        let body = info.body;
        let tags = info.tag;
        let time = info.time;
        let img = info.img;
        let id = info.id;
        
        console.log(img);
        
        let post = "<div class='post'><div class='header'><div><img class='profile-picture' src='"
        post += pfp
        post += "'><p class='username'>"
        post += author
        post += "</p></div>"
        if (author = localStorage.getItem("username")) {
            post += "<div class='delete'><a onclick = 'deletePost(" + '"' + id + '"' + ")'><i class='fas fa-trash'></i></a></div>"
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
    }
});

// Function to create a new post
createPost = () => {
    let titlee = document.getElementById('title').innerHTML;
    let bodyy = document.getElementById('body').innerHTML;
    if (titlee != "" && (hasImage || bodyy != "")){
        let date = new Date(Date.now()).toString().split(" ");

        postCount = lowerPostCount(postCount);
    
        dbRefList.child("post" + (postCount)).set({
            author: localStorage.getItem("username"),
            pfp: localStorage.getItem("pfp"),
            title: titlee,
            body: bodyy,
            tag: document.getElementById('tags').innerHTML.toLowerCase().split(" "),
            time: date[0] + " " + date[1] + " " + date[2] + " " + date[3]+ " " + date[4],
            img: "https://firebasestorage.googleapis.com/v0/b/uofthacks2021-298a3.appspot.com/o/posts%2Fpost" + (postCount) + "?alt=media",
            isDeleted: false,
            id: postCount
        });
        
        dbRefPostCount.set(postCount);
    } else {
        alert("You are missing some fields! Every post requires a title and a picture or text");
    }
    
    hasImage = false;
    location.reload();
    return false;
}

deletePost = (myID) => {
    dbRefList.child("post" + myID + "/isDeleted").set(true);
    console.log(myID);
    console.log("hello world")
    location.reload();
    return false;
}