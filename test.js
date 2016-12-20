var fs = require('fs');
var path = require('path');
var util = require('util');
var yaml = require('js-yaml');
var CLOUDFORMATION_SCHEMA = require('./index').CLOUDFORMATION_SCHEMA;
fs.readFile(path.join(__dirname, 'custom.yml'), 'utf8', function (error, data) {
  var loaded;

  if (!error) {
    loaded = yaml.load(data, { schema: CLOUDFORMATION_SCHEMA });
    console.log(util.inspect(loaded, false, 20, true));
    console.log('vpc is', loaded.Resources.WindowsSingleELBSecurityGroup.Properties.VpcId);
    console.log(yaml.dump(loaded, {schema: CLOUDFORMATION_SCHEMA}))
  } else {
    console.error(error.stack || error.message || String(error));
  }
});
