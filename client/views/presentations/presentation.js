Template.presentation.helpers({

});

Template.presentation.rendered = function() {
    viewer = Crocodoc.createViewer('.viewer', {
        url: 'https://view-api.box.com/1/sessions/'+ this.data.sessionId + '/assets',
        layout: Crocodoc.LAYOUT_PRESENTATION
    });
    viewer.load();
};

Template.presentation.events({
    'click button': function(e) {
        if (typeof viewer !== 'undefined') {
            var $button = $(e.target);

            if ($button.get(0).id === 'next') {
                viewer.scrollTo(Crocodoc.SCROLL_NEXT);
            } else if ($button.get(0).id === 'previous') {
                viewer.scrollTo(Crocodoc.SCROLL_PREVIOUS);
            }
        }
    }
});