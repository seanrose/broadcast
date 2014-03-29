Router.configure({
    layoutTemplate: 'layout'
});

PresentationController = RouteController.extend({
    template: 'presentation',
    load: function() {
        Session.set('presentationId', this.params._id);
        if (this.route.name === 'presenter') {
            Session.set('isPresenter', true);
        } else {
            Session.set('isPresenter', false);
        }
    },
    data: function() {
        return Presentations.findOne(this.params._id);
    },
    waitOn: function() {
        return Meteor.subscribe('singlePresentation', this.params._id);
    }
});

Router.map(function() {
    this.route('presenter', {
        path: '/presenter/:_id',
        controller: PresentationController
    });

    this.route('viewer', {
        path: '/viewer/:_id',
        controller: PresentationController
    });

    this.route('upload', {
        path: '/',
        template: 'presentationUpload'
    });
});
