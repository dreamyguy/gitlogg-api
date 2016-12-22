var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'zzz'
    },
    port: process.env.PORT || 7000,
    db: 'mongodb://localhost/zzz-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'zzz'
    },
    port: process.env.PORT || 7000,
    db: 'mongodb://localhost/zzz-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'zzz'
    },
    port: process.env.PORT || 7000,
    db: 'mongodb://localhost/zzz-production'
  }
};

module.exports = config[env];
