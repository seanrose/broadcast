Template.viewer.rendered = function() {
    presentationData = this.data;
    var page = presentationData.page;

    viewer = Crocodoc.createViewer('.viewer', {
        url: 'https://view-api.box.com/1/sessions/'+ presentationData.sessionId + '/assets',
        layout: Crocodoc.LAYOUT_PRESENTATION,
        page: page,
        plugins: {
            realtime: {
                url: presentationData.realtimeUrl
            }
        }
    });
    viewer.load();

    viewer.on('ready', function() {
        _.delay(function() {
            $('.viewer').addClass('fade-in');
        }, 500);
    });

    Deps.autorun(function() {
        var presentationCursor = Presentations.find(
            {sessionId: presentationData.sessionId},
            {fields: {page: 1} }
        );
        currentPage = presentationCursor.fetch()[0].page;
        viewer.scrollTo(currentPage);
    });
};
