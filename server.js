const fastify = require("fastify")({ logger: true });
const chalk = require('chalk');

require('dotenv').config();

// Custom plugins connect
fastify.register(require('@fastify/multipart'));

fastify.register(require("./db-connector"));
fastify.register(require("./routes"));


// Run the server
fastify.listen({ port: 8080, host: "127.0.0.1" }, (error, address) => {
  if (error) {
    fastify.log.error(error);
    process.exit(1);
  }

  console.log(chalk.red(`Running on `) + chalk.bgWhite(address))
});
