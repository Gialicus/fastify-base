const { default: fp } = require("fastify-plugin");

module.exports = fp(
    async function(fastify,opts) {
        fastify.register(require('fastify-mongodb'),{url: fastify.config.MONGO_URL,forceClose: true})
    }
)