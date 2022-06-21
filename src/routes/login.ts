import { FastifyInstance } from 'fastify';




export default async function (server: FastifyInstance) {
	server.get('/login', async (request, reply) => {
		return ' you are logied in ';
	});

	
}

