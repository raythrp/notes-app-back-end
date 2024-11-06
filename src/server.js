const Hapi = require('@hapi/hapi');
const routes = require('./routes.js');

const init = async () => {
  const server = Hapi.server({
    port: process.env.NODE_ENV !== 'production' ? 8080 : 5000,
    host: process.env.NODE_ENV !== 'production' ? '127.0.0.1' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*']
      }
    }
  });

  server.route(routes);

  await server.start();
  console.log(`Server runs on ${server.info.uri}`);
};

init();