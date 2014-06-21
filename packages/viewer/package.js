Package.describe({
    summary: "Provides viewer.js."
});

Package.on_use(function (api) {
    api.use('jquery', 'client');

    api.add_files('crocodoc.viewer.css', 'client');
    api.add_files('crocodoc.viewer.js', 'client');
    api.add_files('eventsource.js', 'client');
    api.add_files('realtime.js', 'client');
    api.add_files('fullscreen.js', 'client');
    api.add_files('fullscreen.css', 'client');

    api.export('Crocodoc', 'client');
});
