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
        action: function() {
            if (this.params._id === 'test') {
                this.redirect('/presenter/9wtSudD3G4MMKZvpN');
            } else {
                this.render();
            }
        }
    });

    this.route('presentationUpload', {
        path: '/upload',
        template: 'presentationUpload'
    });
});
