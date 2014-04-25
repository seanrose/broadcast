var BOX_VIEW_API_KEY = Meteor.settings.BOX_VIEW_API_KEY;
var DOCUMENTS_URL = 'https://view-api.box.com/1/documents';
var SESSIONS_URL = 'https://view-api.box.com/1/sessions';

var HTTP_NO_CONTENT = 204;
var HTTP_TOO_MANY_REQUESTS = 429;

var RETRY_AFTER = 'Retry-After';

// TODO(seanrose): use UUID package
var generateUUID = function() {
    var nodeUUID = Meteor.require('node-uuid');
    return nodeUUID.v4();
};

var sleep = function(seconds) {
    var sleep = Meteor.require('sleep');
    sleep.sleep(seconds);
}

// TODO(seanrose): use power queue to handle rate limiting
Meteor.methods({
	createPresentation: function(fileUrl) {
        // First upload the document
    	var options = {};
    	options.headers = {
    		Authorization: 'Token ' + BOX_VIEW_API_KEY,
    	};
    	options.data = {
    		url: fileUrl
    	};
    	var documentResponse = HTTP.call('POST', DOCUMENTS_URL, options);

        // Handle rate limiting
        // TODO (seanrose): maybe handle this in a central place?
        if (documentResponse.statusCode === HTTP_TOO_MANY_REQUESTS) {
            sleep(documentResponse.headers.RETRY_AFTER);
            return createPresentation(fileUrl);
        }

        // TODO(seanrose): handle failure case somehow lol

        var presenterId = generateUUID();
        // Create the presentation in the DB
        var presentation = Presentations.insert({
            documentId: documentResponse.data.id,
            sessionId: '',
            presenterId: presenterId,
            page: 1,
            createdAt: Date.now()
        });

        return presenterId;
    },

    createSession: function(documentId) {
        // Create the session
        var options = {};
        options.headers = {
            Authorization: 'Token ' + BOX_VIEW_API_KEY,
        };
        options.data = {
            document_id: documentId
        };
        var sessionResponse = HTTP.call('POST', SESSIONS_URL, options);

        // Handle rate limiting
        // TODO (seanrose): maybe handle this in a central place?
        if (sessionResponse.statusCode === HTTP_TOO_MANY_REQUESTS) {
            sleep(sessionResponse.headers.RETRY_AFTER);
            return createSession(documentId);
        }

        // TODO(seanrose): handle failure case somehow lol

        return sessionResponse.data.id;
    },

    deleteDocument: function(documentId) {
        var options = {};
        options.headers = {
            Authorization: 'Token ' + BOX_VIEW_API_KEY,
        };
        var single_document_url = DOCUMENTS_URL + '/' + documentId;

        var documentResponse = HTTP.call('DELETE', single_document_url, options);

        // Handle rate limiting
        // TODO (seanrose): maybe handle this in a central place?
        if (documentResponse.statusCode === HTTP_TOO_MANY_REQUESTS) {
            sleep(documentResponse.headers.RETRY_AFTER);
            return deleteDocument(documentId);
        }

        return documentResponse.statusCode === HTTP_NO_CONTENT;
    }
});
