Template.presenter.helpers({
    baseUrl: function() {
        return window.location.protocol+"//"+window.location.host;
    }
});

Template.presenter.rendered = function() {
    presentationData = this.data;

    viewer = Crocodoc.createViewer('.viewer', {
        url: 'https://view-api.box.com/1/sessions/'+ presentationData.sessionId + '/assets',
        layout: Crocodoc.LAYOUT_PRESENTATION
    });
    viewer.load();

    viewer.on('ready', function() {
        // When the Box viewer is ready, show the modal with the viewer linik
        var $viewerLinkModal = $('#viewer-link-modal');
        $viewerLinkModal.modal('show');
        // When the user closes the modal, fade in the presentation
        $viewerLinkModal.on('hidden.bs.modal', function() {
            $('.viewer, .btn-presentation').addClass('fade-in');
        });
    });

    // Update the DB whenever the page changes
    viewer.on('pagefocus', function(event) {
        Presentations.update({_id: presentationData._id}, {
            $set: {page: event.data.page}
        });
    });

};

Template.presenter.events({
    'click button': function(e) {
        e.preventDefault();

        var $button = $(e.target);

        if ($button.get(0).id === 'next') {
            viewer.scrollTo(Crocodoc.SCROLL_NEXT);
        } else if ($button.get(0).id === 'previous') {
            viewer.scrollTo(Crocodoc.SCROLL_PREVIOUS);
        }

        return false;
    }
});
