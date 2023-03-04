const fastify = require("fastify")({ logger: true });
const chalk = require('chalk');

require('dotenv').config();

// Custom plugins connect
fastify.register(require('@fastify/multipart'));
fastify.register(require('@fastify/cors'), (instance) => {
  return (req, callback) => {
    const corsOptions = {
      // This is NOT recommended for production as it enables reflection exploits
      origin: true
    };

    // do not include CORS headers for requests from localhost
    if (/^localhost$/m.test(req.headers.origin)) {
      corsOptions.origin = false
    }

    // callback expects two parameters: error and options
    callback(null, corsOptions)
  }
})

fastify.register(require("./db-connector"));
fastify.register(require("./routes"));


// Run the server
fastify.listen({ port: 8081, host: "127.0.0.1" }, (error, address) => {
  if (error) {
    fastify.log.error(error);
    process.exit(1);
  }

  console.log(chalk.red(`Running on `) + chalk.bgWhite(address))
});
