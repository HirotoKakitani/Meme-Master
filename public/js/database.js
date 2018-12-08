//get database reference
var hiro_database = firebase.database();

/* use userId to find appropriate place to same image
 *      userId: user's id number
 *      imageFlat: the image data of whole meme
 *      imgName: name of meme
 *      imgTop: top text of meme
 *      imgBottom: bottom text of meme
 *      imgRaw: image data of just the background image 
 */
function hiro_saveImage(userId, imgFlat, imgName, imgTop, imgBottom, imgRaw){
    var saveRef = firebase.database().ref("users/"+userId);
    let found = false;
    saveRef.once("value").then(function(snapshot){
        snapshot.forEach(function(childSnapshot){
            //meme is already in the database, update in place
            if (imgName == childSnapshot.val().meme_name){
                let memeKey = childSnapshot.key;
                console.log("found in datase, updating "+memeKey);
                found = true;
                firebase.database().ref("users/"+userId+"/"+memeKey).set({
                    meme: imgFlat,
                    meme_name: imgName,
                    top_text: imgTop,
                    bot_text: imgBottom,
                    raw_img: imgRaw
                }, function(error){
                    if (error){     //catch any errors
                        console.log(error);
                    }
                    else{           //otherwise, go back to main page
                        window.location="main.html";
                    }
                }); 
            };
        });
        //push new meme
        if (!found){
            console.log("not in database, pushing new meme"); 
            //push new meme to database
            var hiro_listRef = firebase.database().ref('users/'+ userId);
            var hiro_PostRef = hiro_listRef.push(); //create a new post refernece. hiro_PostRef.key returns randomly generated key. 
            firebase.database().ref('users/' + userId + '/' + hiro_PostRef.key).set({
                meme: imgFlat,
                meme_name: imgName,
                top_text: imgTop,
                bot_text: imgBottom,
                raw_img: imgRaw
            }, function(error){
                if (error){         //catch any errors
                    console.log(error);
                }
                else{               //otherwise, go back to main page
                    window.location="main.html";
                }
            });
        };
    });
    setTimeout(saveCallback,500);
};

function hiro_loadPreview(userId){
    var userList = firebase.database().ref("users/"+userId);
    var flatArray = [];

    var canvasContainer = document.getElementById("hiro_memeContainer");
    //load data if user exists
    userList.once("value").then(function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var imgNode = document.createElement("img");
            var titleNode = document.createElement("p");
            imgNode.src = JSON.parse(childSnapshot.child("meme").val());
            imgNode.id = childSnapshot.child("meme_name").val();
            imgNode.onclick=function(){
                sessionStorage.setItem("linkFrom", childSnapshot.key);
                window.location="editor.html";
            };
            titleNode.innerHTML = childSnapshot.child("meme_name").val();
            canvasContainer.appendChild(imgNode);
            canvasContainer.appendChild(titleNode);
             
        });
    });
};

function hiro_deleteMeme(userId, meme_name, delCallback){
    //find the meme by title, delete it if it exists
    var delRef = firebase.database().ref("users/"+userId);
    delRef.once("value").then(function(snapshot){
        snapshot.forEach(function(childSnapshot){
            //meme is in the database, remove it 
            if (meme_name == childSnapshot.val().meme_name){
                console.log("deleting meme");
                let memeKey = childSnapshot.key;
                console.log("found in datase, deleting "+memeKey);
                firebase.database().ref("users/"+userId+"/"+memeKey).remove();
            };
        });
    });
    setTimeout(delCallback, 500);
    
};
