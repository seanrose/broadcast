Template.presentation.helpers({

});

Template.presentation.rendered = function() {
    presentationData = this.data;

    // Stupid hack that ensures this is only run on first rendering
    if (!this.rendered) {
        viewer = Crocodoc.createViewer('.viewer', {
            url: 'https://view-api.box.com/1/sessions/'+ presentationData.sessionId + '/assets',
            layout: Crocodoc.LAYOUT_PRESENTATION
        });
        viewer.load();

        // Update the DB whenever the page changes
        viewer.on('pagefocus', function(event) {
            Presentations.update({_id: presentationData._id}, {
                $set: {page: event.data.page}
            });
        });

        // Set to true to ensure this block isn't run again
        this.rendered = true;
    }

    Deps.autorun(function() {
        var presentationCursor = Presentations.find({_id: presentationData._id});
        currentPage = presentationCursor.fetch()[0].page;
        // Must use try/catch block because of bug in Deps.afterFlush
        try {
            viewer.scrollTo(currentPage);
        } catch (e) {
            if (e.message !== "Cannot call method 'scrollTo' of undefined") {
                throw(e);
            }
        }
    });
};

Template.presentation.events({
    'click button': function(e) {
        e.preventDefault();

        if (typeof viewer !== 'undefined') {
            var $button = $(e.target);

            if ($button.get(0).id === 'next') {
                viewer.scrollTo(Crocodoc.SCROLL_NEXT);
            } else if ($button.get(0).id === 'previous') {
                viewer.scrollTo(Crocodoc.SCROLL_PREVIOUS);
            }
        }

        return false;
    },

    'click .page-tracker': function(e) {
        e.preventDefault();


    }
});