hiro_accountInit(hiro_accountConfig);
firebase.auth().onAuthStateChanged(function(user){
    if(user){
        console.log ("logged in");
        console.log(user);
        document.getElementById("hiro_emailLink").innerHTML=user.email;
 
    }
    else{
        console.log ("nobody logged in");
        //TODO redirect to unavailable page
        window.location="index.html";
    }
});

 
window.onload = function(){
    console.log("main page");
    document.getElementById("hiro_newMeme").addEventListener("click", function(){
        window.location="editor.html";
    });

    //log out button
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


