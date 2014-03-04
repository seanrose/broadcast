Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function() {
    this.route('singlePresentation', {
        path: '/presentations/:_id',
        template: 'presentation',
        data: function() { return Presentations.findOne(this.params._id); }
    });
});