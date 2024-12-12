
/*************************************\
xAPI Launcher - this is used to launch the xAPI with all the details for creating our statements
You will need to change:
- auth to your auth in LRS (authkey)
- the path to the LRS
- the launch url for the module which is Articulate or Captivate (theLaunchURL)
/*************************************/




var authkey = "Basic " + toBase64(lrsData.authkey);
var endpoint = lrsData.endpoint;
var theLaunchURL = lrsData.theLaunchURL;
var activityID = lrsData.activityID;



function config_LRS(){
//  Tell the content where to send the xAPI statements
		
	conf = {
	  "endpoint" : endpoint,
	  "auth" : authkey
	};  					

ADL.XAPIWrapper.changeConfig(conf);			

}




/* Sends an attachment to the LRS linked to a User and a Course */
function sendxAPI(verb,activitytype,shortdesc,longdesc,showresult,completion,success,score,response) {
  config_LRS();
  //Build Agent

  var name = 'User, Unknown'; //Set a dummy value just incase
   try{
    name = SCORM2004_GetStudentName();    //try and get the student name from the SCORM object
  }catch(err){
    name = SCORM_GetStudentName(); //try SCORM 1.2
  }finally{
    if(name ==""){
	name = 'User, Unknown'; // set a default value
    }
}
   
    
var player = GetPlayer();
//get the StoryLine object to get any variables 	
var activityid ="";
	

if(shortdesc ==""){
  shortdesc =player.GetVar("Project.SlideTitle");
}
	
//Build the Activity ID from the Slide Numbers. This is based on having the currentSlide Variable set. This also includes
//the short description
var uActivityid = activityID;
activityid = uActivityid+'?&ac='+shortdesc.replace(/ /g,"+");    
var result = [];	    


 

   // SCORM doesn't get email well, so use the HomePage and Name as the Agent 
  var stmt = {
  actor: {
      objectType: 'Agent',
      account: {
          name: name,
          homePage: lrsData.homePage,
      }
  },
  
    verb: ADL.verbs[verb],
    object: {
      id: activityid, 
      objectType: 'Activity',
      definition: {
        type: ADL.activitytype[activitytype],
        name: {
          'en-US': shortdesc
        },
        description:{
          'en-US': longdesc  
        }
         }
      },
  
    
    context: {
      registration: generateUUID(),
      language: 'en',
      contextActivities: {
        //Set the version of the SCORM package we're using. Set this in a SL variable called version which is part of the eLearning SL configuration for all QR products
        category: [{
          objectType: 'Activity',
          id: uActivityid, 
          definition: {
            type: "http://id.tincanapi.com/activitytype/source"
          }
        }],
        parent: [{
          objectType: 'Activity',
          id: activityID,
          definition: {
            type: ADL.activitytype[activitytype.toLowerCase()]
          }
        }],
        grouping: [{
          objectType: 'Activity',
          id: activityid,
        }]
      },
      extensions: {
        // We want to know the browser that the user is using, so we'll capture this too
        "http://id.tincanapi.com/extension/browser-info": {
          "name": {
            "en-US": "browser information"
          },
          "description": {
            "name": GetBrowser(),
            "user-agent-header": navigator.userAgent,
            "cookies-enabled": navigator.cookieEnabled
          }
        }
      }
    }
  };
    
    
  if(showresult ===true){
	   result = {
    "completion": completion,
    "success": success,
	  "response": response,
	  "duration": ISO8601_time(),
      score: {
       "scaled": 0,
       "max":100,
       "min":0,
       "raw": (success ? 1 : 0)
      },
       };
    
	  stmt.result = result;
	  
  }  
    
    
 if(lrsData.showConsole){
    console.log(stmt); 
 }
 

 ADL.XAPIWrapper.sendStatement(stmt);


}



/*------------------------------------------------------------------------------------------------------------------------------*/



// xAPI Statements - don't touch this or anything below here :) !
/*
* Builds and sends the xAPI Statement to the LRS
* verb (String) - from the select list of verbs set out in xapi_adl.js -> REQUIRED
* activitytype (String) - from the list in xapi_actvitytype.js -> REQUIRED
* shortdesc (String) - Short description of experience -> REQUIRED
* longdesc (String) - A more detailed description of experience
* showresult (bool) - include the result 
* completion (bool) - sets the completion of the result object **must be used if showresult is true**
* success (bool) - sets the success of the result object **must be used if showresult is true**
* score (int) - sets the raw score of the result **must be used if showresult is true**
* response (string) - the answer the to question **must be used if showresult is true**
*
*/
function xapistatement(verb,activitytype,shortdesc,longdesc,showresult,completion,success,score,response) { 

    
    
    sendxAPI(verb,activitytype,shortdesc,longdesc,showresult,completion,success,score,response);
    
    return;
    



}


/****************** Helper functions************************/



function getQueryVariable(variable) {

  var query = window.location.search.substring(1);

  var vars = query.split('&');

  for (var i=0;i<vars.length;i++) {

    var pair = vars[i].split('=');

    if (pair[0] == variable) {

      return pair[1];

    }

  }

  return false;

}


function generateUUID() {

  var d = new Date().getTime();

  if (window.performance && typeof window.performance.now === 'function') {

    d += performance.now(); // Use high-precision timer if available

  }

  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {

    var r = (d + Math.random()*16)%16 | 0;

    d = Math.floor(d / 16);

    return (c=='x' ? r : (r&0x3|0x8)).toString(16);

  });

  return uuid;

}


function ISO8601_time(){
	//Duration must be set in ISO_8601 format. So 25 seconds would be P25S
	var player = GetPlayer();	
	var DateTime = new Date();
	var currentTime = DateTime.getTime();	
	
	return "PT"+Math.round((currentTime /1000) - (player.GetVar("SlideTimeStart") / 1000))+"S";
	
	
}

function getURLQS(){
	
	var url = window.location.href;
	if(window.location.search ===''){
		return "?";
	}
	else{
		return "&";
	}
	
}


/* These 2 functions are used to calculate the Next and previous slide numbers
 * To add to the Activity Description
 */
function getNextSlide(){

	var player = GetPlayer();	
	var slideNumber = "0";
	var totalSlides = player.GetVar("totalSlide");
	slideNumber = player.GetVar("currentSlide");

	if(slideNumber <= totalSlides){
		return "Advanced to slide "+ ++slideNumber;
	}else{

		return "Advanced to slide "+ totalSlides;
	}
	
	
}
function getPrevSlide(){
	
	var player = GetPlayer();	
	var slideNumber = "0";
	var totalSlides = player.GetVar("totalSlide");
	slideNumber = player.GetVar("currentSlide");

	if(slideNumber >= 1 ){
		return "Returned to slide "+ --slideNumber;
	}else{

		return "Returned to slide 1";
	}
	
	
	
}


/* this is an assumption based on the name passed and is not always correct */

function buildEmail(studentName){
	
	var arr = studentName.trim().split(/\s*,\s*/);
	
	return arr[1]+"."+arr[0]+"@example.com.au";
	
} 


/* get the Browser details for the Browser Extension in the xAPI Statement */

function GetBrowser()
{
    var _browser = "";
	var isIE  = false;
	// Opera 8.0+
   
    // Internet Explorer 6-11
    if(/*@cc_on!@*/false || !!document.documentMode){
		_browser = "Internet Explorer";
		isIE = true;
	}
 	
    // Edge 20+
    if(!isIE && !!window.StyleMedia){
		_browser = "Edge";
	}

    // Chrome 1+
    if(!!window.chrome && !!window.chrome.webstore || /chrome/.test( navigator.userAgent.toLowerCase())){
		_browser = "Chrome";
	}

    if(/constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification)){
		_browser  ="Safari";
		
	}
	return _browser;
}


