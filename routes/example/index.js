'use strict'
const S = require('fluent-json-schema')

module.exports = async function (fastify, opts) {

  function selectOne(request, reply) {
    fastify.selectOne({}).then(item => reply.send(item))
  }
  function createOne(request, reply) {
    fastify.createOne(request.body).then(item => reply.send(item))
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
    handler: selectOne
  })

  fastify.route({
    method: 'POST',
    url: '/',
    schema: {
      body: S.object()
        .prop('nome',S.string().required())
        .prop('cognome',S.string().required()),
      response: {
        200: S.object()
          .prop('insertedId',S.string())
      }
    },
    handler: createOne
  })

}
