'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const Env = require('fastify-env')
const Cors = require('fastify-cors')
const S = require('fluent-json-schema')

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  // Do not touch the following lines

  // Env loading
  fastify.register(Env,{
    schema: S.object()
      .prop('MONGO_URL',S.string().required())
      .prop('SCHEMA',S.string().required())
      .valueOf()
  })

  // Cors settings
  fastify.register(Cors)

  // Mongo settings
  // fastify.register(require('fastify-mongodb'),{url: 'mongodb://localhost:27017'})

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}
