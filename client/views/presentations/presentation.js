Template.presentation.helpers({

});

Template.presentation.rendered = function() {
    // Stupid hack that ensures this is only run on first rendering
    if (!this.rendered) {
        viewer = Crocodoc.createViewer('.viewer', {
            url: 'https://view-api.box.com/1/sessions/'+ this.data.sessionId + '/assets',
            layout: Crocodoc.LAYOUT_PRESENTATION
        });
        viewer.load();

        // Ghetto means of passing the new page to where we can log to the DB
        viewer.on('pagefocus', function(event) {
            Session.set('page', event.data.page);
            $('.page-tracker').trigger('click');
        });

        // Set to true to ensure this block isn't run again
        this.rendered = true;
    }
};

Template.presentation.events({
    'click button': function(event) {
        event.preventDefault();

        if (typeof viewer !== 'undefined') {
            var $button = $(event.target);

            if ($button.get(0).id === 'next') {
                viewer.scrollTo(Crocodoc.SCROLL_NEXT);
            } else if ($button.get(0).id === 'previous') {
                viewer.scrollTo(Crocodoc.SCROLL_PREVIOUS);
            }
        }
    },

    'click .page-tracker': function(event) {
        Presentations.update({_id: this._id}, {
            $set: {page: Session.get('page')}
        });
    }
});