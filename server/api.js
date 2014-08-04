var generateUUID = function() {
    var nodeUUID = Meteor.require('node-uuid');
    return nodeUUID.v4();
};

var boxViewClient = Meteor.require('box-view').createClient(Meteor.settings.BOX_VIEW_API_KEY);

// TODO(seanrose): use power queue to handle rate limiting
Meteor.methods({
	createPresentation: function(fileUrl) {
        // Upload the document to the Box View API
        // Wrapped with blocking package to force box-view to be synchronous
        var response = blocking( boxViewClient, boxViewClient.documents.uploadURL )( fileUrl );

        //  TODO(seanrose): handle rate limiting

        var presenterId = generateUUID();
        // Create the presentation in the DB
        var presentation = Presentations.insert({
            documentId: response.id,
            sessionId: '',
            presenterId: presenterId,
            page: 1,
            createdAt: Date.now()
        });

        return presenterId;
    },

    createSession: function(documentId) {
        // Create the session
        // Wrapped with blocking package to force box-view to be synchronous
        var response = blocking( boxViewClient, boxViewClient.sessions.create )( documentId );

        // TODO(seanrose): handle rate limiting

        return response;
    },

    deleteDocument: function(documentId) {
        // Delete the document
        // Wrapped with blocking package to force box-view to be synchronous
        var response = blocking( boxViewClient, boxViewClient.documents.delete )( documentId );

        // TODO(seanrose): handle rate limiting

        return true;
    }
});

Meteor.call('deleteDocument', '46d6e66d96ca4884913ab10a1f728abf');
