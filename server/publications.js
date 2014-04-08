// TODO(seanrose): limit this subscription to querying only based on presentationId
Meteor.publish('presenter', function(presenterId) {
    return presenterId && Presentations.find({presenterId: presenterId});
});

Meteor.publish('viewer', function(sessionId) {
	return sessionId && Presentations.find(
		{sessionId: sessionId},
		{fields: {page: 1, sessionId: 1}}
	);
});
