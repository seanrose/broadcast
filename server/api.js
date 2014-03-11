BOX_VIEW_TOKEN = 'r6ql08a8nzsh9n0c7ez86nram80ze1sp'
DOCUMENTS_URL = 'https://view-api.box.com/1/documents'
SESSIONS_URL = 'https://view-api.box.com/1/sessions'

Meteor.methods({
	createPresentation: function(fileUrl) {
    	var options = {};
    	options.headers = {
    		Authorization: 'Token ' + BOX_VIEW_TOKEN,
    	};
    	options.data = { url: fileUrl };

    	var response = HTTP.call('POST', DOCUMENTS_URL, options);
        console.log(response);
    }
});
