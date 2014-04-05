Template.upload.events({
    'click #upload': function(e) {
        e.preventDefault();
        $('#upload').addClass('fade-out');
        filepicker.setKey('A3UuvGmumRN273ixbsJnVz');
        filepicker.pick(function(InkBlob) {
            Meteor.call('createPresentation', InkBlob.url, function(error, presentationId) {
            	Router.go('presenter', {_id: presentationId});
            });
        });
    }
});
