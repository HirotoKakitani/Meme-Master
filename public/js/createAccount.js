hiro_accountInit(hiro_accountConfig);
firebase.auth().onAuthStateChanged(function(user){
    //if user is logged in already, redirect to main page
    if(user){
        console.log("user logged in already, redirecting to main")
        window.location="main.html";
    }
});


window.onload=function(){
    //on click of button, validate the input. if not valid, do not submit
    document.getElementById("hiro_submitSignUp").addEventListener("click",function(){    
        var pw1 = document.getElementById("hiro_pwSignUp").value;
        var pw2 = document.getElementById("hiro_confirmSignUp").value;
        //TODO user can create account, but if we try to move to a different page, a network error is raised.
        if (pw1 == pw2){
            //console.log("passwords matched");
            alert("passwords matched");
            var newUser = document.getElementById("hiro_emailSignUp").value;
            var newPW = document.getElementById("hiro_pwSignUp").value;
            console.log(newUser);
            console.log(newPW);
            firebase.auth().createUserWithEmailAndPassword(newUser, newPW).catch(function(error){
                alert(`${error.code}: ${error.message}`);
                //TODO handle errors here
            });
        }
        else{
            //console.log("password don't match");
            alert("password don't match");
            //event.preventDefault();
        }
    });
};


