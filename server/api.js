var generateUUID = function() {
    var nodeUUID = Meteor.require('node-uuid');
    return nodeUUID.v4();
};

var boxViewClient = Meteor.require('box-view').createClient(Meteor.settings.box.token);

// TODO(seanrose): use power queue to handle rate limiting
Meteor.methods({

    /**
     * Given a url to a file, creates a
     * document in the Box View API and
     * a corresponding entry in the DB
     *
     * @param <String> fileUrl:
     * @return <String> presenterId
     */
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

    /**
     * Given a Box View API document ID,
     * creates a Box View API session
     *
     * @param <String> documentId:
     * @return <Object> response
     */
    createSession: function(documentId) {
        // Create the session
        // Wrapped with blocking package to force box-view to be synchronous
        var response = blocking( boxViewClient, boxViewClient.sessions.create )( documentId );

        // TODO(seanrose): handle rate limiting

        return response;
    },

    /**
     * Given a Box View API document ID,
     * deletes the document in the View API
     *
     * @param <String> documentId:
     * @return <Boolean>
     */
    deleteDocument: function(documentId) {
        // Delete the document
        // Wrapped with blocking package to force box-view to be synchronous
        var response = blocking( boxViewClient, boxViewClient.documents.delete )( documentId );

        // TODO(seanrose): handle rate limiting

        return true;
    }
});
