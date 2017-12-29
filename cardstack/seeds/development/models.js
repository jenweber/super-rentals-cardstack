// cardstack/seeds/development/models.js

const Factory = require('@cardstack/test-support/jsonapi-factory');

module.exports = [
  {
    type: 'data-sources',
    id: 'default',
    attributes: {
      'source-type': '@cardstack/ephemeral',
      params: {
        initialModels: initialModels()
      }
    }
  },
  {
    type: 'plugin-configs',
    id: '@cardstack/hub',
    relationships: {
      'default-data-source': {
        data: { type: 'data-sources', id: 'default' }
      }
    }
  }
];

function initialModels() {
  let factory = new Factory();

  factory.addResource('content-types', 'pages')
    .withAttributes({
      'routing-field': 'permalink'
    })
    .withRelated('fields', [
      factory.addResource('fields', 'title')
        .withAttributes({
          'field-type': '@cardstack/core-types::string'
        }),
      factory.addResource('fields', 'body')
        .withAttributes({
          'field-type': '@cardstack/core-types::string'
        }),
      factory.addResource('fields', 'permalink')
        .withAttributes({
          'field-type': '@cardstack/core-types::string'
        }),
    ]);

    factory.addResource('pages').withAttributes({
      permalink: " ", // a string with a single space
      title: "Welcome to Cardstack!",
    });

  return factory.getModels();
}
