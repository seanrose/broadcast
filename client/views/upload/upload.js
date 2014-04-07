Template.upload.rendered = function() {
    $('#title').addClass('bob-up');
    $('#information').addClass('fade-in-long');
    $('#upload').addClass('pop-out');
};

Template.upload.events({
    'click #upload': function(e) {
        e.preventDefault();
        $('#upload, h1, h3').addClass('fade-out ');
        filepicker.setKey('A3UuvGmumRN273ixbsJnVz');
        var pickerOptions = {
            extension: ['.pdf', '.ppt', '.pptx'],
            services: ['COMPUTER', 'BOX','DROPBOX', 'GOOGLE_DRIVE', 'SKYDRIVE', 'URL']
        }
        filepicker.pick(pickerOptions, function(InkBlob) {
            Meteor.call('createPresentation', InkBlob.url, function(error, presentationId) {
            	Router.go('presenter', {_id: presentationId});
            });
        });
    }
});
