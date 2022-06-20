
//const server =require('./server');
// CommonJs
const fastify = require('fastify')({logger: true})/////**************** */


// Declare a route1
fastify.get('/',async(request, reply) => {
  return { hello: 'go reader' };
});

// Declare a route2
fastify.get('/g',async(request, reply) => {
  return { hello: 'hello' };
});



// Run the server!
fastify.listen({ port: 3000 }).catch ((err)=> {
  fastify.log.error(err)
  process.exit(1)
});









