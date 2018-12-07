hiro_accountInit(hiro_accountConfig);
firebase.auth().onAuthStateChanged(function(user){
    //if user is logged in already, redirect to main page
    if(user){
        console.log("user logged in already, redirecting to main")
        window.location="main.html";
    }
});


window.onload=function(){
    console.log("account initialization done");
    //TODO on form submit, get info from text inputs, sign into account
    //document.getElementById("hiro_submitSignIn").addEventListener("click",function(){
    document.getElementById("hiro_submitSignIn").addEventListener("click",function(){
        var userEmail = document.getElementById("hiro_emailSignIn").value;
        var userPW = document.getElementById("hiro_pwSignIn").value;
        firebase.auth().signInWithEmailAndPassword(userEmail,userPW).catch(function(error){
            console.log(`${error.code}: ${error.message}`);
        });
        console.log("successful login");
        //TODO update database with user's info. redirect to homepage on successful login. Prompt again if unsuccessful signin 
    });
};


