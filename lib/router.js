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
    }
});

Router.map(function() {
    this.route('presenter', {
        path: '/presenter/:presenterId',
        template: 'presenter',

        controller: PresentationController,

        data: function() {
            return Presentations.findOne({presenterId: this.params.presenterId});
        },

        waitOn: function() {
            return Meteor.subscribe('presenter', this.params.presenterId);
        }
    });

    this.route('viewer', {
        path: '/viewer/:sessionId',
        template: 'viewer',

        controller: PresentationController,

        data: function() {
            return Presentations.findOne({sessionId: this.params.sessionId});
        },

        waitOn: function() {
            return Meteor.subscribe('viewer', this.params.sessionId)
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
