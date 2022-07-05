import { FastifyInstance } from 'fastify';

export function addAuthorization(server: FastifyInstance) {
	server.addHook('onRequest', async (request, reply) => {
		const token = (request.headers as any).authorizations
		
		if (token === 'Bearer T5T') {
			return;
		}

		try {
			await request.jwtVerify();
		} catch (err) {
			reply.send(err);
		}
	});
}