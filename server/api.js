function generateUUID() {
    var nodeUUID = Meteor.require('node-uuid');
    return nodeUUID.v4();
}

var boxViewClient = Meteor.require('box-view').createClient(Meteor.settings.box.token);
// Wrapped async methods from the Box View API
var documentsUploadURL = Async.wrap(boxViewClient.documents, 'uploadURL');
var sessionsCreate = Async.wrap(boxViewClient.sessions, 'create');
var documentsDelete = Async.wrap(boxViewClient.documents, 'delete');

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
        var response = documentsUploadURL(fileUrl);

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
        // Create the Box View API session
        var response = sessionsCreate(documentId);

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
        var response = documentsDelete(documentId);

        // TODO(seanrose): handle rate limiting

        return true;
    }
});
