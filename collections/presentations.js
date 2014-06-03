Presentations = new Meteor.Collection('presentations');

// Only allow updating of the 'page' by the presenter
Presentations.allow({
	update: function(userId, doc, fieldNames, modifier) {
		var operations = _.keys(modifier);
		return (
			// Must have both page and presenterId field
			// !_.without(fieldNames, 'page', 'presenterId').length > 0
			_.intersection(fieldNames, ['page', 'presenterId']).length === 2 &&
			// Only allow $set
			_.intersection(operations, ['$set']).length === 1 &&
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
