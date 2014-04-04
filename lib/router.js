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
    },
    waitOn: function() {
        // TODO(seanrose): Create separate subscriptions/permissions for presenter vs. viewer
        if (this.route.name === 'presenter') {
            return Meteor.subscribe('singlePresentation', {_id: this.params._id});
        } else {
            return Meteor.subscribe('singlePresentation', {sessionId: this.params.sessionId});
        }
    }
});

Router.map(function() {
    this.route('presenter', {
        path: '/presenter/:_id',
        controller: PresentationController,
        data: function() {
            return Presentations.findOne(this.params._id);
        }
    });

    this.route('viewer', {
        path: '/viewer/:sessionId',
        controller: PresentationController,
        data: function() {
            return Presentations.findOne({sessionId: this.params.sessionId});
        }
    });

    this.route('upload', {
        path: '/'
    });

    this.route('webhook', {
        path: '/webhook',
        where: 'server',

        action: function() {
            console.log(this.request);
        }
    })
});
