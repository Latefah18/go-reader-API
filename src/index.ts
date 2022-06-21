import { server } from './server';



server.get('/start',async(request, reply) => {
    return { hello: 'go reader' };
  });
  


server.listen({ port: 3001 }).catch((err) => {
	server.log.error(err);
	process.exit(1);
});