const fastifyPlugin = require("fastify-plugin");

async function dbConnector(fastify, options) {
  fastify.register(require("@fastify/mongodb"), {
    url: `${process.env.DATABASE_CONNECTOR}`,
  });
}

module.exports = fastifyPlugin(dbConnector);
