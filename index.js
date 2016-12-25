const yaml = require('js-yaml');
const localTags = require('./tags.json');

function Model(name) {
  return function (data) {
    this.class = name;
    this.name = name;
    this.data = data;
  };
}

function CustomYamlType(name, kind) {
  let model = new Model(name);
  return new yaml.Type('!'+name, {
    kind: kind,
    instanceOf: model,
    construct: function(data) {
      return new model(data);
    },
    represent: function(ref, style) {
      return ref.data;
    }
  });
}

function build() {
  let cloudformationTags = [];
  Object.keys(localTags).map((kind) => localTags[kind].map((tag) => cloudformationTags.push(CustomYamlType(tag, kind))));
  return cloudformationTags;
}

module.exports.tags = cloudformationTags = build();
module.exports.CLOUDFORMATION_SCHEMA = yaml.Schema.create(cloudformationTags);
