/*
*List of Activities for your company:
*
*https://registry.tincanapi.com/
*
*/



/* Returns the link of the Activity type with the ID from the registry*/

(function(ADL){

  ADL.activitytype = {
	  //A course represents an entire "content package" worth of material. The largest level of granularity. Unless flat, a course consists of multiple modules. A course is not content.
    "course" : 
        "http://adlnet.gov/expapi/activities/course"
    ,
	  //A question is typically part of an assessment and requires a response from the learner, a response that is then evaluated for correctness.
	  "question" :  "http://activitystrea.ms/schema/1.0/question"
    , 
	  //Represents objects such as news articles, knowledge base entries, or other similar construct. Such objects generally consist of paragraphs of text, in some cases incorporating embedded media such as photos and inline hyperlinks to other resources.
	  "article" :  "http://activitystrea.ms/schema/1.0/article"
    ,
	  //Represents any form of document or file. Objects of this type MAY contain an additional fileUrl property whose value a dereferenceable IRI that can be used to retrieve the file; and an additional mimeType property whose value is the MIME type of the file described by the object.
	  "file" :  "http://activitystrea.ms/schema/1.0/file"
    ,
	  //Represents video content of any kind. Objects of this type MAY contain additional properties as specified in Section 3.1.
	    "video" :  "http://activitystrea.ms/schema/1.0/video"
    ,
	  //An assessment is an activity that determines a learner's mastery of a particular subject area. An assessment typically has one or more questions.
	      "assessment" :  "http://adlnet.gov/expapi/activities/assessment"
    ,
	  //An interaction is typically a part of a larger activity (such as assessment or simulation) and refers to a control to which a learner provides input. An interaction can be either an asset or function independently.
	      "interaction" :  "http://adlnet.gov/expapi/activities/interaction"
    ,
	  //A link is simply a means of expressing a link to another resource within, or external to, an activity. A link is not synonymous with launching another resource and should be considered external to the current resource. Links are not learning content, nor SCOs. If a link is intended for this purpose, it should be re-categorized.
	      "link" :  "http://adlnet.gov/expapi/activities/link"
    ,
	  //Media refers to text, audio, or video used to convey information. Media can be consumed (tracked: completed), but doesn't have an interactive component that may result in a score, success, or failure.
	      "media" :  "http://adlnet.gov/expapi/activities/media"
    ,
	  //An electronic document of the type produced by office productivity software such as a word processing document, spreadsheet, slides etc.
	  	      "document" :  "http://id.tincanapi.com/activitytype/document"
    ,
	  //Electronic message sent over a computer network from a sender to one or many recipients.
	    "email" :  "http://id.tincanapi.com/activitytype/email"
    ,
	  //A resource is a generic item that the actor may use for something. It could be a video, a text article, a device, etc. However, it is recommended to use a more specific activity type like those mentioned.
	  	      "resource" :  "http://id.tincanapi.com/activitytype/resource"
    ,
	  //Scenario - scenario based learning - is delivering the content embedded within a story or scenario rather than just pushing the content straight out. Usually a story or a situation is presented to ask for learner's action, feedback or branching follow. In this way learners see how the learning is applied to job environments or real world problems.	 
	  "scenario" :  "http://id.tincanapi.com/activitytype/scenario"
    ,
	  //Represents a graphical image. Objects of this type MAY contain an additional fullImage property whose value is an Activity Streams Media Link to a "full-sized" representation of the image.
	     "image" :  "http://activitystrea.ms/schema/1.0/image"
    ,
	   //Interaction activities of "cmi.interaction" type as defined in the SCORM 2004 4th Edition Run-Time Environment.
	  "cmi" :  "http://adlnet.gov/expapi/activities/cmi.interaction"
  };

}(window.ADL = window.ADL || {}));



