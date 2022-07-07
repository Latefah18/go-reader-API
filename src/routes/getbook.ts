import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client'
const prismaClient = new PrismaClient()
import { Book } from '@prisma/client'
import Fuse from 'fuse.js';

const Book = Type.Object({
	book_id: Type.String(),
	
});

const GetQuery = Type.Object({
	title: Type.Optional(Type.String()),
});
type GetQuery = Static<typeof GetQuery>;

export default async function (server: FastifyInstance) {
/////use get query  *******************************************
//addAuthorization(server);
server.route({
	method: 'GET',
	url:'/Bookg',
	schema: {
		summary: 'get book by GetQuery',
		tags: ['Book'],	
		querystring: GetQuery,
	},
	handler: async (request, reply) => {
	
		const query = request.query as GetQuery;

		const book = await prismaClient.book.findMany();
		if (!query.title) return book;

		const fuse = new Fuse(book, {
			includeScore: true,
			isCaseSensitive: false,
			includeMatches: true,
			findAllMatches: true,
			threshold: 1,
			keys: ['title'],
		});
	
		  console.log(JSON.stringify(fuse.search(query.title)));
			return book.filter((c) => c.title.includes(query.title ?? ''));
		
	}

});	
			
	}







  