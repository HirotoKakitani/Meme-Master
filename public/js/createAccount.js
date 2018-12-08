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
        if (pw1 == pw2){
            //console.log("passwords matched");
            alert("passwords matched");
            var newUser = document.getElementById("hiro_emailSignUp").value;
            var newPW = document.getElementById("hiro_pwSignUp").value;
            firebase.auth().createUserWithEmailAndPassword(newUser, newPW).catch(function(error){
                alert(`${error.code}: ${error.message}`);
            });
        }
        else{
            alert("Password don't match!");
        }
    });
};


