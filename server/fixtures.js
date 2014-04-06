// fixture data
if (Presentations.find().count() === 0) {

    // a presentation
    Presentations.insert({
        _id: '9wtSudD3G4MMKZvpN',
        // Box View document id
        documentId: '',
        // Box View session id
        sessionId: '6798f955a51840d3bd6adc481b27343d',
        // The current page being viewed
        page: 1,
        // When the presentation was created
        createdAt: Date.now()
    });
}
