'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const localkeys = require('./localkeys')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  GOOGLE_API_KEY: JSON.stringify(localkeys.googleFont)
})
