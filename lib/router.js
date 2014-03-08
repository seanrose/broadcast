Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function() {
    this.route('singlePresentation', {
        path: '/presentations/:_id',
        template: 'presentation',
        waitOn: function() {
            return Meteor.subscribe('singlePresentation', this.params._id);
        },
        data: function() { return Presentations.findOne(this.params._id); }
    });
});
