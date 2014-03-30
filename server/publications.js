Meteor.publish('singlePresentation', function(data) {
    return data && Presentations.find(data);
});
