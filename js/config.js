
/*
For the authkey you must use a username:password combination
Don't forget to add a forward slash at the end of the enedpoint
Home page is used when creating the actor Agent

*/

var homePage="";
try{
   homePage = window.location.protocol +'//'+ window.location.hostname;
}catch(err){
   homePage = "https://connectandlearn.isq.qld.edu.au/";
}

lrsData = {
	"authkey": "username:password",
	"endpoint": "https://your.lrs/xapi/",
	"theLaunchURL": "index_lms.html",
	"activityID":"http://this-is-the-activity",
	"showConsole": true, //This will show the xAPI object in the Browser Console
	"homePage": homePage
}



