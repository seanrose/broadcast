Router.configure({
    layoutTemplate: 'layout',
});
Router.onBeforeAction(function (pause) {
  if (!this.ready()) {
    this.render('loading');
    pause(); // otherwise the action will just render the main template.
  }
});

PresentationController = RouteController.extend({
    template: 'presentation',
    onRun: function() {
        Session.set('presentationId', this.params._id);
        if (this.route.name === 'presenter') {
            Session.set('isPresenter', true);
        } else {
            Session.set('isPresenter', false);
        }
        this.subscribe('singlePresentation', this.params._id, this.params._id).wait();
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

    this.route('uponRun', {
        path: '/',
        template: 'presentationUponRun'
    });
});
