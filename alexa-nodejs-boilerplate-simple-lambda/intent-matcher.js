var Promise = require('bluebird');
var ResponseBuilder = require('./models/ResponseBuilder');


var intentMatcher = dataStore => {
    switch (dataStore.intent) {
        case "default.launch":
            return defaultLaunch(dataStore);
        case "default.sessionended":
            return defaultSessionEnded(dataStore);
        case "amazon.stopintent":
            return amazonStopIntent(dataStore);
        case "amazon.cancelintent":
            return amazonCancelIntent(dataStore);
        default:
            return noIntentMatch(dataStore);
    }
};

var defaultLaunch = function(dataStore) {
    return new Promise((resolve, reject) => {
        var responseBuilder = new ResponseBuilder();
        dataStore.response = responseBuilder.addSpeech({
            speechType: "PlainText",
            text: "Hello This is what you get when you invoke launch"
        });
        resolve(dataStore);
    });
};
var defaultSessionEnded = function(dataStore) {
    return new Promise((resolve, reject) => {
        var responseBuilder = new ResponseBuilder();
        dataStore.response = responseBuilder.addSpeech({
            speechType: "PlainText",
            text: "Thank you."
        });
        resolve(dataStore);
    });
};
var amazonStopIntent = function(dataStore) {
    return new Promise((resolve, reject) => {
        var responseBuilder = new ResponseBuilder();
        dataStore.response = responseBuilder.addSpeech({
            speechType: "PlainText",
            text: "Thank you."
        });
        resolve(dataStore);
    });
};
var amazonCancelIntent = function(dataStore) {
    return new Promise((resolve, reject) => {
        var responseBuilder = new ResponseBuilder();
        dataStore.response = responseBuilder.addSpeech({
            speechType: "PlainText",
            text: "Thank you."
        });
        resolve(dataStore);
    });
};
var noIntentMatch = function(dataStore) {
    return new Promise((resolve, reject) => {
        var responseBuilder = new ResponseBuilder();
        dataStore.response = responseBuilder.addSpeech({
            speechType: "PlainText",
            text: "I don't understand please be more specific."
        });
        resolve(dataStore);
    });
};
module.exports = intentMatcher;