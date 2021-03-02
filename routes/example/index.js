'use strict'
const S = require('fluent-json-schema')

module.exports = async function (fastify, opts) {

  function handler(request, reply) {
    const { httpErrors,mongo,config } = fastify
    async function onCollection(err, col) {
      if (err) reply.send(httpErrors.badRequest('Error from mongo'))
      const funded = await col.findOne({ _id: mongo.ObjectId('5db8624f37b2bf0b38b8a0e6') })
      reply.send(funded)
    }
    mongo.db.collection(config.SCHEMA, onCollection)
  }

  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      response: {
        200: S.object()
          .prop('nome',S.string())
          .prop('cognome',S.string())
      }
    },
    handler: handler
  })

}
