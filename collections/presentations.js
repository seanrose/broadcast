Presentations = new Meteor.Collection('presentations');

Presentations.allow({
	update: function(userId, doc, fieldNames, modifier) {
		return (
			// Must have both page and presenterId field
			!_.without(fieldNames, 'page', 'presenterId').length > 0
			// Only allow $set
			&& _.has(modifier, '$set')
			// Only allow $set if presenterId is known
			&& modifier.$set.presenterId === doc.presenterId
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
