# cloudformation-js-yaml-schema [![Build Status](https://travis-ci.org/yyolk/cloudformation-js-yaml-schema.svg?branch=master)](https://travis-ci.org/yyolk/cloudformation-js-yaml-schema)

Schema to ignore CloudFormation YAML local tags while parsing, ie: `!Ref`, `!Base64`

For utility in templates and build wrappers

See [tags.json](./tags.json) for currently supported local tags

## Use Cases

I've created this package primarily for use in creating CloudFormation templates


## Dependent Of

- Atom Linter for CloudFormation Yaml: https://github.com/yyolk/linter-js-cloudformation-yaml
