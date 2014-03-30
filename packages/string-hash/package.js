Package.describe({
  summary: "Adds a hash function to the string prototype"
});

Package.on_use(function (api, where) {
  api.add_files('string-hash.js', ['client', 'server']);
});

Package.on_test(function (api) {
  api.use('string-hash');

  api.add_files('string-hash_tests.js', ['client', 'server']);
});
