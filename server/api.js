BOX_VIEW_TOKEN = 'r6ql08a8nzsh9n0c7ez86nram80ze1sp'
DOCUMENTS_URL = 'https://view-api.box.com/1/documents'
SESSIONS_URL = 'https://view-api.box.com/1/sessions'

Meteor.methods({
	createPresentation: function(fileUrl) {
    	// First upload the document
    	var options = {};
    	options.headers = {
    		Authorization: 'Token ' + BOX_VIEW_TOKEN,
    	};
    	options.data = {
    		url: fileUrl
    	};

    	var documentResponse = HTTP.call('POST', DOCUMENTS_URL, options);
    	console.log(documentResponse);
        // Now create a session
        options.data = {
        	document_id: documentResponse.data.id
        }

		var sessionResponse = {
			data: {
				statusCode: 202
			}
		};

		while (sessionResponse.data.statusCode !== 201) {
			Meteor.setTimeout(function() {
				sessionResponse = HTTP.call('POST', SESSIONS_URL, options);
				console.log(sessionResponse);
			}, 2000);
		}

        // Finally return the new session ID

    }
});
