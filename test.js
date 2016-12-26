var fs = require('fs');
var path = require('path');
var util = require('util');
var yaml = require('js-yaml');
var CLOUDFORMATION_SCHEMA = require('./index').CLOUDFORMATION_SCHEMA;
fs.readFile(path.join(__dirname, 'test.yml'), 'utf8', function (error, data) {
  var loaded;

  if (!error) {
    loaded = yaml.load(data, { schema: CLOUDFORMATION_SCHEMA, styles: { "!Ref": { canonical: "!Ref", camelcase: "!Ref" } } });
    console.log(util.inspect(loaded, false, 20, true));
    console.log(yaml.dump(loaded, {noRefs:true, flowLevel: 4, styles: { "!Ref": { canonical: "!Ref", camelcase: "!Ref" } }, noCompatMode: false, schema: CLOUDFORMATION_SCHEMA}))
    newloaded = yaml.load(yaml.dump(loaded, {flowLevel: 3, styles: { "!Ref": { canonical: "!Ref" } }, schema: CLOUDFORMATION_SCHEMA}), {schema: CLOUDFORMATION_SCHEMA});
    console.log(util.inspect(newloaded, false, 20, true));
  } else {
    console.error(error.stack || error.message || String(error));
  }
});
