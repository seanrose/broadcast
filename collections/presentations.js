Presentations = new Meteor.Collection('presentations');

// Only allow updating of the 'page' by the presenter
Presentations.allow({
	update: function(userId, doc, fieldNames, modifier) {
		var operations = _.keys(modifier);
		return (
			// Must have both page and presenterId field
			_.isEqual(fieldNames, ['page', 'presenterId']) &&
			// Only allow $set
			_.isEqual(operations, ['$set']) &&
			// Only allow $set if presenterId is known
			modifier.$set.presenterId === doc.presenterId
		);
	}
});

// Only modifications are allowed on the client
Presentations.deny({
    // Deny insert of presenations
    insert: function() {
    	return true;
    },

    // Deny remove of presentations
    remove: function() {
   		return true;
    }
});
