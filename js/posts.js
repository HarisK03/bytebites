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

// Create references
const dbRefObject = firebase.database().ref().child('object');
const dbRefList = dbRefObject.child('posts');
const dbRefPostCount = dbRefObject.child('postCount');
let postCount;
let user;

// Sync list changes
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
    post += "'></div>"

    post += "<div class='container'><p class='body'></p>"
    post += body
    post += "</p></div></div>"

    document.getElementById("post-collection") += post;
}

    // console.log(post)
    // const liA = document.createElement('li')
    // const liT = document.createElement('li')
    // const liB = document.createElement('li')
    // liA.innerText = post.author;
    // liT.innerText = post.title;
    // liB.innerText = post.body;
    // ulList.appendChild(liA);
    // ulList.appendChild(liT);
    // ulList.appendChild(liB);
