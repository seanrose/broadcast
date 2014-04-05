Template.upload.events({
    'click #upload': function(e) {
        e.preventDefault();
        filepicker.setKey('A3UuvGmumRN273ixbsJnVz');
        filepicker.pick(function(InkBlob) {
            Meteor.call('createPresentation', InkBlob.url, function(error, presentationId) {
                $('#upload').addClass('fade-out');
            	Router.go('presenter', {_id: presentationId});
            });
        });
    }
});
