var Validator = require('jsonschema').Validator;

var ResponseBuilder = function() {
    this.outputSpeech = {};
    this.card = {};
    this.reprompt = {};
    this.shouldEndSession = true;
};

ResponseBuilder.prototype.addSpeech = function(speechBody) {
    let validator = new Validator();
    let speechBodySchema = {
        "id": "/SpeechBody",
        "type": "object",
        "properties": {
            "speechType": { "type": "string" },
            "text": { "type": "string" }
        },
        "required": ["speechType", "text"]

    };
    let validationResult = validator.validate(speechBody, speechBodySchema);
    if (!validationResult.valid) {
        let errors = "Speech Body :-\n";
        validationResult.errors.map((error, index) => {
            errors += (index + 1) + ". " + error.message + ".\n";
        });
        throw new Error(errors);
    }
    switch (speechBody.speechType) {
        case "PlainText":
            this.outputSpeech = {
                type: "PlainText",
                text: speechBody.text
            }
            return this;
        case "SSML":
            this.outputSpeech = {
                type: "SSML",
                ssml: speechBody.text
            }
            return this;
        default:
            throw new Error(`Invalid speech type ${speechBody.speechType}. Supported speech types are PlainText and SSML.`);
            return this;
    }

};

ResponseBuilder.prototype.addCard = function(cardBody) {
    let validator = new Validator();
    let cardBodySchema = {
        "id": "/CardBody",
        "type": "object",
        "properties": {
            "cardType": { "type": "string" },
            "title": { "type": "string" },
            "text": { "type": "string" },
            "smallImageUrl": { "type": "string" },
            "largeImageUrl": { "type": "string" }
        },
        "required": ["cardType", "title", "text"]
    };
    switch (cardBody.cardType) {
        case "Simple":
            let validationResult = validator.validate(cardBody, cardBodySchema);
            if (!validationResult.valid) {
                let errors = "Card Body :-\n";
                validationResult.errors.map((error, index) => {
                    errors += (index + 1) + ". " + error.message + ".\n";
                });
                throw new Error(errors);
            }
            this.card = {
                type: "Simple",
                title: cardBody.title,
                content: cardBody.text
            }
            return this;
        case "Standard":
            validationResult = validator.validate(cardBody, cardBodySchema);
            if (!validationResult.valid) {
                let errors = "Speech Body :-\n";
                validationResult.errors.map((error, index) => {
                    errors += (index + 1) + ". " + error.message + ".\n";
                });
                throw new Error(errors);
            }
            this.card = {
                type: "Standard",
                title: cardBody.title,
                content: cardBody.text,
                smallImageUrl: cardBody.smallImageUrl || '',
                largeImageUrl: cardBody.largeImageUrl || ''
            }
            return this;
        case "LinkAccount":
            this.card = {
                type: "LinkAccount",
            }
            return this;
        default:
            throw new Error(`Invalid card type ${cardBody.cardType}. Supported card types are Simple, Standard and LinkAccount.`);
            return this;
    }
};

ResponseBuilder.prototype.addPrompt = function(promptBody) {
    let validator = new Validator();
    let promptBodySchema = {
        "id": "/PromptBody",
        "type": "object",
        "properties": {
            "promptType": { "type": "string" },
            "text": { "type": "string" }
        },
        "required": ["promptType", "text"]

    };
    let validationResult = validator.validate(promptBody, promptBodySchema);
    if (!validationResult.valid) {
        let errors = "Prompt Body :-\n";
        validationResult.errors.map((error, index) => {
            errors += (index + 1) + ". " + error.message + ".\n";
        });
        throw new Error(errors);
    }
    switch (promptBody.promptType) {
        case "PlainText":
            this.reprompt.outputSpeech = {
                type: "PlainText",
                text: promptBody.text
            }
            this.shouldEndSession = false;
            return this;
        case "SSML":
            this.reprompt.outputSpeech = {
                type: "SSML",
                ssml: promptBody.text
            }
            this.shouldEndSession = false;
            return this;
        default:
            throw new Error(`Invalid prompt type ${promptBody.speechType}. Supported prompt types are PlainText and SSML.`);
            return this;
    }
};
module.exports = ResponseBuilder;