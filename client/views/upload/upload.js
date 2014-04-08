Template.upload.rendered = function() {
    $('#title').addClass('bob-up');
    $('#information').addClass('fade-in-long');
    $('#upload').addClass('pop-out');
};

Template.upload.events({
    'click #upload': function(e) {
        e.preventDefault();
        filepicker.setKey(Meteor.settings.public.filePickerKey);
        var pickerOptions = {
            extension: ['.pdf', '.ppt', '.pptx'],
            services: ['COMPUTER', 'BOX','DROPBOX', 'GOOGLE_DRIVE', 'SKYDRIVE', 'URL']
        }
        filepicker.pick(pickerOptions, function(InkBlob) {
            // Now that we have a file, we don't need those controls
            $('.flex-center').fadeOut();
            Meteor.call('createPresentation', InkBlob.url, function(error, presenterId) {
            	Router.go('presenter', {presenterId: presenterId});
            });
        });
    }
});
