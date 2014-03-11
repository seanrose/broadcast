Router.configure({
    layoutTemplate: 'layout'
});

PresentationController = RouteController.extend({
    template: 'presentation',
    load: function() {
        Session.set('presentationId', this.params._id);
    },
    waitOn: function() {
        return Meteor.subscribe('singlePresentation', this.params._id);
    }
});

Router.map(function() {
    this.route('presenter', {
        path: '/presenter/:_id',
        data: function() {
            var presentation = Presentations.findOne(this.params._id);
            presentation.is_presenter = true;

            return presentation;
        },
        controller: PresentationController
    });

    this.route('viewer', {
        path: '/viewer/:_id',
        data: function() {
            var presentation = Presentations.findOne(this.params._id);
            presentation.is_presenter = false;

            return presentation;
        },
        controller: PresentationController
    });

    this.route('presentationUpload', {
        path: '/upload',
        template: 'presentationUpload'
    });
});
