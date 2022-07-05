import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client'
const prismaClient = new PrismaClient()
import { Quotes } from '@prisma/client'
import { addAuthorization } from '../hook/hook';
import Fuse from 'fuse.js';

const Quotes = Type.Object({
	book_id: Type.String(),
	comment: Type.String(),	
});

const GetQuery = Type.Object({
	comment: Type.Optional(Type.String()),
});
type GetQuery = Static<typeof GetQuery>;

export default async function (server: FastifyInstance) {
	//addAuthorization(server);
/////use get query  *******************************************
server.route({
	method: 'GET',
	url: '/quotes',
	schema: {
		summary: 'get quotes by get query',
		tags: ['quotes'],	
		querystring: GetQuery,
	},
	handler: async (request, reply) => {
	
		const query = request.query as GetQuery;

		const quotes= await prismaClient.quotes.findMany();
		if (!query.comment) return quotes;

		const fuse = new Fuse(quotes, {
			includeScore: true,
			isCaseSensitive: false,
			includeMatches: true,
			findAllMatches: true,
			threshold: 1,
			keys: ['comment'],
		});
	
		console.log(JSON.stringify(fuse.search(query.comment)));
		return quotes.filter((c) => c.comment.includes(query.comment ?? ''));
	
}

});	
		
}
