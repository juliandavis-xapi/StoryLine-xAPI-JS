December 2024



Must update the config.json to reflect the link to LRS 

To add xAPI to StoryLine, add a trigger in StoryLine based on the following function

//Basic
xapistatement('viewed','interaction', 'Introduction');

//Question

xapistatement('answered','question','the x in xAPI stands for experience','',true,false,true,0,'true');


Where function parameters are:
- verb (String) - from the select list of verbs set out in xapi_adl.js
- activitytype (String) - from the list in xapi_actvitytype.js
- shortdesc (String) - Short description of expirience
- longdesc (String) - A more detailed description of experience, can be empty
- showresult (bool) - include the result 
- completion (bool) - sets the completion of the result object **must be used if showresult is true**
- success (bool) - sets the success of the result object **must be used if showresult is true**
- score (int) - sets the raw score of the result **must be used if showresult is true**
- response (string) - the answer the to question **must be used if showresult is true**



Follow these steps after building your StoryLine course

Add to the *_lms.html file

<!-- Start custom xAPI code-->	
	<script src="js/config.js" type="text/javascript"></script>
	<script src="js/xapi/cryptojs_v3.1.2.js" type="text/javascript"></script>
	<script src="js/xapi/xapiwrapper.js" type="text/javascript"></script>
	<script src="js/xapi_activities.js" type="text/javascript"></script>
	<script src="js/xapi_verbs.js" type="text/javascript"></script>
	<script src="js/xapi_web.js" type="text/javascript"></script>
<!-- End Custm xAPI code-->	

Add to the imsmanifest.xml file. Note you may need to remove the space between < and file 
<!-- Start custom xAPI files -->
 < file href="js/config.js" />
 
 < file href="js/xapi_verbs.js" />
 
 < file href="js/xapi_activities.js" />
 
 < file href="js/xapi_web.js" />
 
 < file href="js/xapi/xapiwrapper.js"/>
 
 < file href="js/xapi/cryptojs_v3.1.2.js"/>
 
<!-- End custom xAPI files -->	
