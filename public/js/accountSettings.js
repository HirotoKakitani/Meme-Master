hiro_accountInit(hiro_accountConfig);

window.onload = function(){

    document.getElementById("hiro_submitChange").addEventListener("click", function(){
        var pw1 = document.getElementById("hiro_newPw").value;
        var pw2 = document.getElementById("hiro_newPwConfirm").value;
        if (pw1 == pw2){
            firebase.auth().currentUser.updatePassword(pw1).then(function(){
                alert("Password changed!");
                window.location="main.html"; 
            });
        }
        else{
            alert("Passwords don't match!");
        };
    });

};
