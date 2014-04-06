Template.viewer.rendered = function() {
    presentationData = this.data;
    var page = presentationData.page;

    viewer = Crocodoc.createViewer('.viewer', {
        url: 'https://view-api.box.com/1/sessions/'+ presentationData.sessionId + '/assets',
        layout: Crocodoc.LAYOUT_PRESENTATION,
        page: page
    });
    viewer.load();

    viewer.on('ready', function() {
        _.delay(function() {
            $('.viewer').addClass('fade-in');
        }, 500);
    });

    Deps.autorun(function() {
        var presentationCursor = Presentations.find({_id: presentationData._id});
        currentPage = presentationCursor.fetch()[0].page;
        // Must use try/catch block because of bug in Deps.afterFlush
        try {
            viewer.scrollTo(currentPage);
        } catch (e) {
            var dumbErrorArray = [
                "Cannot call method 'scrollTo' of undefined",
                "Cannot read property 'scrollTo' of undefined"
            ]
            // Use underscore method instead
            if ($.inArray(e.message, dumbErrorArray) === -1) {
                throw(e);
            }
        }
    });
};
