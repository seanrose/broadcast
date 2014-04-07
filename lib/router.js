Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound'
});

PresentationController = RouteController.extend({
    onBeforeAction: function(pause) {
        if (_.isUndefined(this.data()) || this.data().sessionId === '') {
            pause();
        } else {
            this.render();
        }
    },

    onRun: function() {
        Session.set('presentationId', this.params._id);
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
        template: 'presenter',

        controller: PresentationController,

        data: function() {
            return Presentations.findOne(this.params._id);
        }
    });

    this.route('viewer', {
        path: '/viewer/:sessionId',
        template: 'viewer',

        controller: PresentationController,

        data: function() {
            return Presentations.findOne({sessionId: this.params.sessionId});
        }
    });

    this.route('upload', {
        path: '/',
        progress: {
            enabled: false
        }
    });

    this.route('webhook', {
        path: '/webhook',

        where: 'server',

        action: function() {
            var webhooks = this.request.body;

            _.each(webhooks, function(element) {
                if (_.contains(['document.done', 'document.viewable'], element.type)) {
                    var documentId = element.data.id;
                    // Create the View API session
                    var sessionId = Meteor.call('createSession', documentId);

                    Presentations.update(
                        {documentId: documentId},
                        {$set: {sessionId: sessionId}}
                    );
                }
            });
        }
    })
});
