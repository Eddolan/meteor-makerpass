Package.describe({
  name: 'makerpass:oauth',
  summary: "A library to interact with MakerPass",
  version: '1.0.0',
  git: "https://github.com/makerpass/meteor-makerpass"
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.2.1');

  api.use('oauth2', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('http', ['server']);
  api.use('underscore', 'client');
  api.use('templating', 'client');
  api.use('random', 'client');
  api.use('service-configuration', ['client', 'server']);

  api.export('Makerpass');

  api.addFiles(
    ['makerpass_configure.html', 'makerpass_configure.js'],
    'client');

  api.addFiles('makerpass_server.js', 'server');
  api.addFiles('makerpass_client.js', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('makerpass:oauth');
  api.addFiles('makerpass-tests.js');
});
