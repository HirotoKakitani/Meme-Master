hiro_accountInit(hiro_accountConfig);

//checks user status. redirects to login screen if not logged in
firebase.auth().onAuthStateChanged(function(user){
    if(user){
        console.log ("logged in");
        console.log(user);
        document.getElementById("hiro_emailLink").innerHTML=user.email;
    }
    else{
        console.log ("nobody logged in");
        window.location="index.html";
    }
});

window.onload=function(){
    var canvas = document.getElementById("hiro_Canvas");
    var upImg = new Image();
    var context = canvas.getContext("2d");  //gets 2d drawing context for the canvas
    var topVal="";  //default text for top text
    var bottomVal="";  //default text for bottom text
   
    //set up canvas 
    context.font="700 20px Impact";
    context.strokeStyle="black";
    context.fillStyle='white';
    context.textAlign="center";
    function writeTop(){
        context.strokeText(topVal.toUpperCase(),canvas.width/2,20);
        context.fillText(topVal.toUpperCase(),canvas.width/2,20);   
    };
    function writeBottom(){
        context.strokeText(bottomVal.toUpperCase(),canvas.width/2,canvas.height-20);
        context.fillText(bottomVal.toUpperCase(),canvas.width/2, canvas.height-20); 
    };


    //fill fields if editting existing meme
    setTimeout(fillEditor,500);
    
    //handles uploading images/ memes
    document.getElementById("hiro_picUpload").addEventListener("change", function(e){
        var file = new FileReader();
        file.onload=function(event){
            upImg.addEventListener("load",function(){
                context.drawImage(upImg,0,0,canvas.width,canvas.height); 
            });
            upImg.src = event.target.result;
        };
        file.readAsDataURL(e.target.files[0]);
    },false);


    document.getElementById("hiro_topText").onkeyup=function(){
        topVal = this.value;
        console.log(topVal);
    };
    //update text when focus is out of the text box
    document.getElementById("hiro_topText").addEventListener("focusout", function(){
        console.log(topVal)
        //clear canvas, redraw
        context.clearRect(0,0,canvas.width, canvas.height)
        context.drawImage(upImg,0,0, canvas.width, canvas.height); //place in coord 0,0 and fit the dimenetions canvas.width x canvas.height
        writeTop();
        writeBottom(); 
    });
    document.getElementById("hiro_bottomText").onkeyup=function(){
        bottomVal = this.value;
        console.log(bottomVal);
    };
    //update text when focus is out of the text box
    document.getElementById("hiro_bottomText").addEventListener("focusout", function(){
        console.log(bottomVal)
        //clear canvas, redraw
        context.clearRect(0,0,canvas.width, canvas.height)
        context.drawImage(upImg,0,0, canvas.width, canvas.height); //place in coord 0,0 and fit the dimenetions canvas.width x canvas.height
        writeTop(context, topVal);
        writeBottom(context, bottomVal); 
    });

    document.getElementById("hiro_logOut").addEventListener("click", function(){
        firebase.auth().signOut().then(function(){
            //signout success
            console.log("signout success");
        }).catch(function(error){
            //error
            console.log(`${error.code}: ${error.message}`);
        });
    });
    
    //deletes meme
    document.getElementById("hiro_deleteMeme").addEventListener("click", function(){
        var delUserId = firebase.auth().currentUser.uid;
        var delName = document.getElementById("hiro_title").value;
        hiro_deleteMeme(delUserId, delName, function(){window.location="main.html"});
    });
     
    document.getElementById("hiro_saveMeme").addEventListener("click", function(){
        var userId = firebase.auth().currentUser.uid;
        var memeName = document.getElementById("hiro_title").value;
        var topText = document.getElementById("hiro_topText").value;
        var botText = document.getElementById("hiro_bottomText").value;
        var memeFlat = JSON.stringify(canvas.toDataURL());
        var memeRaw = upImg.src;
        hiro_saveImage(userId,memeFlat,memeName,topText,botText,memeRaw);
    }); 


    //function to fill in input values when coming from 
    function fillEditor(){
        var prev = sessionStorage.getItem("linkFrom");
        var dataRef = firebase.database().ref("users/" + firebase.auth().currentUser.uid+"/"+prev);
        if (prev){
            dataRef.once("value").then(function(snapshot){
                //fill canvas and text fields
                var fillTop = snapshot.child("top_text").val();
                var fillBot = snapshot.child("bot_text").val();
                upImg = new Image();
                upImg.src = snapshot.child("raw_img").val();
                upImg.onload= function(){
                    context.drawImage(upImg,0,0,canvas.width,canvas.height); 
                    topVal = fillTop;
                    bottomVal = fillBot;
                    writeTop();
                    writeBottom();
                };
                                 
                document.getElementById("hiro_title").value=snapshot.child("meme_name").val();
                document.getElementById("hiro_topText").value=fillTop;
                document.getElementById("hiro_bottomText").value=fillBot;
            });
            sessionStorage.clear();
        }
        else{
            console.log("new meme");
        }
    };
};


