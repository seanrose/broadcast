var ONE_HOUR = 60*60*1000; // ms

var deleteExpiredPresentations = function() {
	var oneHourAgo = Date.now() - ONE_HOUR;
	var expiredPresentations = Presentations.find(
		{ createdAt: {$lte: oneHourAgo} }
	);
	expiredPresentations.forEach(function (presentation) {
		// TODO (seanrose): handle failure case from API

		if ( !_.isNull(presentation.documentId) ) {
			console.log('Deleting Box View Document ' + presentation.documentId);
			Meteor.call('deleteDocument', presentation.documentId);
		}
		console.log('Deleting Presentation' + presentation._id);
		Presentations.remove(presentation);
	});
};

var cron = new Meteor.Cron( {
     events: {
        "* * * * *"  : deleteExpiredPresentations
	}
});
