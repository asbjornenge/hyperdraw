#!/usr/bin/env node
var args = require('minimist')(process.argv.slice(2), {})
require('./index')(args.color)
