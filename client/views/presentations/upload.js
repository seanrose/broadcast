Template.upload.events({
    'click #upload': function(e) {
        e.preventDefault();
        filepicker.setKey('A3UuvGmumRN273ixbsJnVz');
        filepicker.pick(function(InkBlob) {
            Meteor.call('createPresentation', InkBlob.url, function(error, presentationId) {
            	presentationLink = Router.routes['presenter'].path({_id: presentationId});
            	$('#presentation-btn').attr('href', presentationLink).fadeIn('slow');
            });
        });
    }
});
