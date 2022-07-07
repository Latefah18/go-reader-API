
import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client'
const prismaClient = new PrismaClient()
import { Book } from '@prisma/client'
import { addAuthorization } from '../hook/hook';

const Book = Type.Object({
	//book_id: Type.String(),
	title: Type.String(),
	type: Type.String(),
	author: Type.String(),
	pages: Type.String(),
	cost: Type.String(),
   description : Type.String(),
	
});

export default async function (server: FastifyInstance) {
	//*********************add new book************************ 
	//addAuthorization(server);
	server.route({
		method: 'POST',
		url: '/Book',
		schema: {
			summary: 'add new book',
			tags: ['Book'],
			body: Book,
		},
		handler: async (request, reply) => {
			const book = request.body as Book;
			await prismaClient.book.create({
				data: book,
			});

			return prismaClient.book.findMany();
		},
	});
}