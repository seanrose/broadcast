Package.describe({
    summary: "Provides viewer.js."
});

Package.on_use(function (api) {
    api.use('jquery', 'client');

    api.add_files('crocodoc.viewer.min.css', 'client');
    api.add_files('crocodoc.viewer.min.js', 'client');

    api.export('Crocodoc', 'client');
});
