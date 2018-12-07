//TODO need to make into module?
// Initialize Firebase
//export var hiro_accountConfig = {
var hiro_accountConfig = {
    apiKey: "AIzaSyDMGaCJQ1Z3xxfhpbxEQg1SIMnlpiCTsTQ",
    authDomain: "meme-master-9f1ad.firebaseapp.com",
    databaseURL: "https://meme-master-9f1ad.firebaseio.com",
    projectId: "meme-master-9f1ad",
    storageBucket: "meme-master-9f1ad.appspot.com",
    messagingSenderId: "730027728149"
};
//export function hiro_accountInit(config){
function hiro_accountInit(config){
    firebase.initializeApp(config);
};

//TODO define event listeners here too and export them. Multiple files can have elements with the same ids, so things that are common between different pages can have the same id's and use the same event listener.
