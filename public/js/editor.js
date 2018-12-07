hiro_accountInit(hiro_accountConfig);
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
    context.font="bold 20px Impact";
    context.strokeStyle="black";
    context.fillStyle='white';
    context.font="bold 20px Impact";
    context.strokeStyle="black";
    context.fillStyle='white';
    context.textAlign="center";
    function writeTop(){
        context.strokeText(topVal,canvas.width/2,20);
        context.fillText(topVal,canvas.width/2,20);   
    };
    function writeBottom(){
        context.strokeText(bottomVal,canvas.width/2,canvas.height-20);
        context.fillText(bottomVal,canvas.width/2, canvas.height-20); 
    };

    //handles uploading images/ memes
    document.getElementById("hiro_picUpload").addEventListener("change", function(e){
        var file = new FileReader();
        file.onload=function(event){
            upImg.addEventListener("load",function(){
                context.drawImage(upImg,0,0,canvas.width,canvas.height); 
            });
            upImg.src = event.target.result;
        };
        //upImg.src = event.target.result;
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
    
        //writeTop(context, topVal);
        //writeBottom(context, bottomVal); 
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
    
 
};
