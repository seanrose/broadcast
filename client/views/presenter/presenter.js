Template.presenter.helpers({
    baseUrl: function() {
        return window.location.protocol+"//"+window.location.host;
    }
});

Template.presenter.rendered = function() {
    presentationData = this.data;

    viewer = Crocodoc.createViewer('.viewer', {
        url: 'https://view-api.box.com/1/sessions/'+ presentationData.sessionId + '/assets',
        layout: Crocodoc.LAYOUT_PRESENTATION,
        plugins: {
            realtime: {
                url: presentationData.realtimeUrl
            },
            fullscreen: {}
        }
    });
    viewer.load();

    viewer.on('ready', function() {
        // When the Box viewer is ready, show the modal with the viewer linik
        var $viewerLinkModal = $('#viewer-link-modal');
        $viewerLinkModal.modal('show');
        // When the user closes the modal, fade in the presentation
        $viewerLinkModal.on('hidden.bs.modal', function() {
            $('.viewer').addClass('fade-in');
            $('.btn-presentation').addClass('bob-in');
        });
    });

    // Update the DB whenever the page changes
    viewer.on('pagefocus', function(event) {
        Presentations.update({_id: presentationData._id}, {
            $set: {
                page: event.data.page,
                presenterId: presentationData.presenterId
            }
        });
    });

    // Keyboard shortcuts
    $(window).on('keydown', function(e){
        e.preventDefault();

        switch (e.keyCode) {
            // right arrow key or page down scrolls next
            case 34:
            case 39:
                viewer.scrollTo(Crocodoc.SCROLL_NEXT);
                break;
            // left arrow key or page up scrolls previous
            case 33:
            case 37:
                viewer.scrollTo(Crocodoc.SCROLL_PREVIOUS);
                break;
            // f toggles fullscreen
            case 70:
                viewer.enterFullscreen();
                break;

            default:
                break;
        }
    });
};

Template.presenter.events({
    'click #next': function(e) {
        e.preventDefault();
        viewer.scrollTo(Crocodoc.SCROLL_NEXT);
    },

    'click #previous': function(e) {
        e.preventDefault();
        viewer.scrollTo(Crocodoc.SCROLL_PREVIOUS);
    }
});
