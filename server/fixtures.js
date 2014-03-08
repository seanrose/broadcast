// fixture data
if (Presentations.find().count() === 0) {

    // a presentation
    Presentations.insert({
        sessionId: 'd3a1c0c5ef7549ed8f126251738f7f91',
        viewerId: generateId(),
        page: "1"
    });
}