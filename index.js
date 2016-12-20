// import yaml from 'js-yaml';
const yaml = require('js-yaml');

function buildCfTags() {
  let cloudformationMappingTags = [
    "!Base64",
  ];
  let cloudformationSequenceTags = [
    "!And",
    "!Equals",
    "!GetAtt",
    "!If",
    "!FindInMap",
    "!Join",
    "!Not",
    "!Or",
    "!Select",
  ];
  let cloudformationScalarTags = [
    "!Ref",
    "!Sub",
    "!GetAZs",
    "!GetAtt",
    "!ImportValue",
    "!Condition",
  ];
  let cloudformationTags = [];
  cloudformationMappingTags.map(tag => cloudformationTags.push(new yaml.Type(tag, {kind: 'mapping'})));
  cloudformationSequenceTags.map(tag => cloudformationTags.push(new yaml.Type(tag, {kind:'sequence'})));
  cloudformationScalarTags.map(tag => cloudformationTags.push(new yaml.Type(tag, {kind:'scalar'})));
  return cloudformationTags;
}
module.exports.tags = cloudformationTags = buildCfTags();
// const cloudformationTags = buildCfTags();
// export Schema = yaml.Schema.create(cloudformationTags);
// export tags = cloudformationTags;
//
module.exports.CLOUDFORMATION_SCHEMA = yaml.Schema.create(cloudformationTags);
