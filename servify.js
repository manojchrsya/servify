#!/usr/bin/env node
const program = require('commander');

const pkg = require('./package.json');
require('dotenv').config();

program
  .version(pkg.version);

program.on('--help', () => {
  // eslint-disable-next-line no-console
  console.log(`Version: ${pkg.version}`);
  // eslint-disable-next-line no-console
  console.log(`Environment: ${process.env.NODE_ENV}`);
  // eslint-disable-next-line no-console
  console.log('Dump: ./downloads');
  // eslint-disable-next-line no-console
  console.log('');
});

program.parse(process.argv);
