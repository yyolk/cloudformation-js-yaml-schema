'use strict';

const yaml = require('js-yaml');
const localTags = require('./tags.json');
const cloudformationTags = build(localTags, yaml);

function build(localTags, yaml) {
  function Model(name) {
    return function (data) {
      this.class = name;
      this.name = name;
      this.data = data;
    };
  }
  function CustomYamlType(name, kind) {
    const model = Model(name);
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
  let cloudformationTags = [];
  Object.keys(localTags).map((kind) => localTags[kind].map((tag) => cloudformationTags.push(new CustomYamlType(tag, kind))));
  return cloudformationTags;
}

module.exports.localTags = localTags;
module.exports.build = build;
module.exports.cloudformationTags = cloudformationTags;
module.exports.CLOUDFORMATION_SCHEMA = yaml.Schema.create(cloudformationTags);
module.exports.genSchema = function(yaml) {
    return yaml.Schema.create(build(localTags, yaml));
};
