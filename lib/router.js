Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function() {
    this.route('presenter', {
        path: '/presenter/:_id',
        template: 'presentation',
        load: function() {
            Session.set('presentationId', this.params._id);
        },
        waitOn: function() {
            return Meteor.subscribe('singlePresentation', this.params._id);
        },
        data: function() { return Presentations.findOne(this.params._id); },
    });

    this.route('presentationUpload', {
        path: '/upload',
        template: 'presentationUpload'
    });
});
