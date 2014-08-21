Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    trackPageView: true
});

PresentationController = RouteController.extend({
    // Don't try to load unless the session ID is found
    // TODO(seanrose): need to handle case of unknown presenter id
    onBeforeAction: function(pause) {
        if (_.isUndefined(this.data()) || this.data().sessionId === '') {
            pause();
        }
    },

    // Render the error template if the Box View API
    // conversion process fails
    action: function() {
        if (this.data().sessionId === 'error') {
            this.render('notFound');
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
            return Meteor.subscribe('viewer', this.params.sessionId);
        }
    });

    this.route('upload', {
        path: '/',
        progress: {
            enabled: false
        }
    });

    // TODO(seanrose): Handle case where webhook is not a valid document to prevent dos
    this.route('webhook', {
        path: '/webhook',

        where: 'server',

        action: function() {
            var webhooks = this.request.body;

            _.each(webhooks, function(element) {
                if (element.type === 'document.viewable') {
                    var documentId = element.data.id;
                    // Create the View API session
                    var sessionData = Meteor.call('createSession', documentId);

                    Presentations.update(
                        {documentId: documentId},
                        {$set: {
                                sessionId: sessionData.id,
                                realtimeUrl: sessionData.urls.realtime
                            }
                        }
                    );
                } else if (element.type === 'document.error') {
                    var documentId = element.data.id;

                    Presentations.update(
                        {documentId: documentId},
                        {$set: {
                                sessionId: 'error'
                            }
                        }
                    );
                }
            });
            this.response.writeHead(200, {'Content-Type': 'text/html'});
            this.response.end('yolo\n');
        }
    });
});
