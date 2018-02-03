# Alexa NodeJs Boilerplates

These boilerplates are written to reduce the complexity of making Alexa skills from scratch. Along with that, these boilerplates also provides an abstraction over various step of project setup. 

## The philosophy behind the Boilerplate:
There is three major concept/philosophy is being followed: 

**1. Every request is a user’s intention**: According to Amazon intents and launch/session ended request are two different things. But to make things simpler and code be more structured, these boilerplate codes take Launch and session ended request also as intent, so to make the request available in the intent-matcher module.
![Request Flow](resources/request-flow.jpg?raw=true "Title") 

**2. The concept of Data Store:** This boilerplate heavily rely on data present in the data store for most of its functionality. Data store contains all the information that is necessary for running the logic in different parts of the code. The major components of a data store are:
* userData: {}
* attributes: {}
* intent: ''
* slots: []
* response: {}

Why dataStore? Because it makes it easy for us to put everything in dataStore and use it whenever we wanted so that we can avoid sending the number of different arguments to different functions. When a new request arrives in the system/code it is parsed and relevant data is stored in the data store object like intent information, user information and session data that is stored in the previous request. So whenever any information is required let’s say inside functions written in intent-matcher we can fetch it from dataStore. Also when we send the response back to the handler from our intent matcher we store the response in the dataStore and resolve to the handler or/and if we want to persist any data then we store it as a value for the attribute key and resolve it. And Handler will automatically take care of converting it to specific Alexa response format.

**3. Response Builder:** Response builder removes the problem of creating the response (again and again by writing the same code), Response builder helps in creating a response purely based on the function calls. Like if only plain text response is required then

    dataStore.response = responseBuilder.addSpeech({
        speechType: "PlainText",
        text: "Hello Greeting from your skill"
    });

And if want to add a card response to the same, then

    dataStore.response = responseBuilder.addSpeech({
        speechType: "PlainText",
        text: "Hello Greeting from your skill"
    }).addCard({
        cardType: "Simple",
        title: "Something",
        text: "Defining something"
    });

Visit the models/Response.js file to know more about these functions. After that just resolve the dataStore that contains these responses and then Handler will automatically create a proper response.


## How to use:
Using these boilerplates is very simple, here are the steps on how you can use and build your code on the top of boilerplate:
1. First, clone or download the boilerplate you want to use.
2. Then for lambda to respond to Alexa Skill request it is necessary to have Alexa Skill Id in your lambda code.  There are two ways how you can add Skill Id to the code:
   1.  Add the skill id to the environment variable by the name APPLICATION_ID or,
   2.  Add the skill id to the file settings.json (follow  the JSON schema in the following format):

		    {
		        "<your project name>": {
		            "applicationId": "<your application id>"
		        }
		    }
		    
	Note:
	* \<your project name\> should be same as the name of your project specified in package.json file.
	* Above configuration can be found in handler.js in case if you want to tweak the code.

3. Now for business logic, use intent-matcher.js file, the code in the file is divided into two major units/blocks. First one is the **Switch block** and another one is the **Functional block**. Switch block contains a switch statement which switches the program execution control on the basis of incoming intents. For e.g. If the user says *cancel* then it will call the method written on _amazon.cancel_ case. Use already written code to write new cases (or intent switches). 
	For e.g.
	To add a response to a new intent (let say greeting), then add a new case called *greeting* and call a function of the same name (for sake of simplicity only). 
	
	    case "greeting":
		    return greeting(dataStore);

	Note that this function greeting(dataStore) should return a promise resolving new response (and attributes) in the data store like this.
	

		var greeting = function(dataStore) {
		    return new Promise((resolve, reject) => {
		        var responseBuilder = new ResponseBuilder();
		        dataStore.response = responseBuilder.addSpeech({
		            speechType: "PlainText",
		            text: "Hello Greeting from your skill"
		        });
		        resolve(dataStore);
		    });
		};

4. Once it is done you can save/deploy your lambda function and enjoy.

***

***

***
Note that this document is still under continuous development ;)
Reach out to me via raising issue or mail, if needed :)