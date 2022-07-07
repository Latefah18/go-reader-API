
import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client'
const prismaClient = new PrismaClient()
import { Quotes } from '@prisma/client'
import { addAuthorization } from '../hook/hook';

const Quotes = Type.Object({
	//book_id: Type.String(),
	comment: Type.String(),

	
});

export default async function (server: FastifyInstance) {
	//*********************add newqutes************************ 
	//addAuthorization(server);

	server.route({
		method: 'POST',
		url: '/quotes',
		schema: {
			summary: 'add new qutes',
			tags: ['quotes'],
			body: Quotes,
		},
		handler: async (request, reply) => {
			const quotes = request.body as Quotes;
			await prismaClient.quotes.create({
				data: quotes,
			});

			return prismaClient.quotes.findMany();
		},
	});
}