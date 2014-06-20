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
            }
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

    // Bind page change controls to left and right arrow keys
    $(window).on('keydown', function(e){
        if (_.contains([34, 39], e.keyCode)) { // Right arrow key
            viewer.scrollTo(Crocodoc.SCROLL_NEXT);
        } else if (_.contains([33, 37], e.keyCode)) { // left arrow key
            viewer.scrollTo(Crocodoc.SCROLL_PREVIOUS);
        } else {
            return;
        }
        e.preventDefault();
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
