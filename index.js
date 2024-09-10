#!/usr/bin/env node

const yargs = require('yargs');
const { backupMySQL, backupPostgres, backupMongoDB, backupSQLite, compressBackup, uploadToS3 } = require('./backup');

yargs
  .command({
    command: 'backup',
    describe: 'Backup a database',
    builder: {
      type: {
        describe: 'Database type (mysql, postgres, mongodb, sqlite)',
        demandOption: true,
        type: 'string',
      },
      host: {
        describe: 'Database host',
        demandOption: false,
        type: 'string',
      },
      port: {
        describe: 'Database port',
        demandOption: false,
        type: 'number',
      },
      user: {
        describe: 'Database user',
        demandOption: false,
        type: 'string',
      },
      password: {
        describe: 'Database password',
        demandOption: false,
        type: 'string',
      },
      database: {
        describe: 'Database name',
        demandOption: false,
        type: 'string',
      },
      output: {
        describe: 'Output file for backup',
        demandOption: false,
        type: 'string',
      },
      outputDir: {
        describe: 'Output directory for MongoDB backup',
        demandOption: false,
        type: 'string',
      },
      compress: {
        describe: 'Compress backup file',
        demandOption: false,
        type: 'boolean',
      },
      upload: {
        describe: 'Upload backup to S3',
        demandOption: false,
        type: 'boolean',
      },
      bucket: {
        describe: 'S3 bucket name',
        demandOption: false,
        type: 'string',
      },
      key: {
        describe: 'S3 key',
        demandOption: false,
        type: 'string',
      },
    },
    handler(argv) {
      if (argv.type === 'mysql') {
        backupMySQL(argv);
      } else if (argv.type === 'postgres') {
        backupPostgres(argv);
      } else if (argv.type === 'mongodb') {
        backupMongoDB(argv);
      } else if (argv.type === 'sqlite') {
        backupSQLite(argv);
      } else {
        console.error('Unsupported database type');
      }

      if (argv.compress && argv.output) {
        compressBackup(argv.output, `${argv.output}.zip`);
      }

      if (argv.upload && argv.bucket && argv.key) {
        uploadToS3(argv.output, argv.bucket, argv.key);
      }
    }
  })
  .help()
  .alias('help', 'h')
  .argv;
