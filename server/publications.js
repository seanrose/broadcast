// TODO(seanrose): limit this subscription to querying only based on presentationId
Meteor.publish('singlePresentation', function(data) {
    return data && Presentations.find(data);
});

Meteor.publish('viewer', function(sessionId) {
	return sessionId && Presentations.find(
		{sessionId: sessionId},
		{fields: {page: 1, sessionId: 1}}
	);
});
