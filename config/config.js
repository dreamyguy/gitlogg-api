var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'gitlogg-api'
    },
    port: process.env.PORT || 7000,
    db: 'mongodb://localhost/gitlogg-api-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'gitlogg-api'
    },
    port: process.env.PORT || 7000,
    db: 'mongodb://localhost/gitlogg-api-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'gitlogg-api'
    },
    port: process.env.PORT || 7000,
    db: 'mongodb://localhost/gitlogg-api-production'
  }
};

module.exports = config[env];
