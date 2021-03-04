const { default: fp } = require("fastify-plugin")

async function autoriService(fastify, opts) {
    const { mongo, config } = fastify
    async function findOne(filter) {
        return new Promise((resolve, reject) => {
            const onCollection = async (err, col) => {
                if (err) reject(err)
                const funded = await col.findOne(filter)
                resolve(funded)
            }
            mongo.db.collection(config.SCHEMA, onCollection)
        })
    }
    async function insert(objToInsert) {
        return new Promise((resolve, reject) => {
            const onCollection = async (err, col) => {
                if (err) reject(err)
                const saved = await col.insertOne(objToInsert)
                resolve({ insertedId: saved.insertedId })
            }
            mongo.db.collection(config.SCHEMA, onCollection)
        })
    }

    fastify.decorate('selectOne', findOne)
    fastify.decorate('createOne', insert)
}

module.exports = fp(autoriService)