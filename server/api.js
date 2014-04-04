BOX_VIEW_API_KEY = Meteor.settings.BOX_VIEW_API_KEY;
DOCUMENTS_URL = 'https://view-api.box.com/1/documents';
SESSIONS_URL = 'https://view-api.box.com/1/sessions';

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

        // TODO(seanrose): handle failure case somehow lol

        // Create the presentation in the DB
        var presentation = Presentations.insert({
            documentId: documentResponse.data.id,
            sessionId: '',
            page: 1
        });

        return presentation;
    }
});
